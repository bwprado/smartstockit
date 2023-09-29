<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import EmptyWrapper from "$lib/components/EmptyWrapper.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import PageHeader from "$lib/components/PageHeader.svelte"
    import SelectSearch from "$lib/components/SelectSearch.svelte"
    import Table from "$lib/components/Table/Table.svelte"

    import { getToastStore } from "@skeletonlabs/skeleton"
    import { isEmpty } from "lodash"
    import type { PageServerData } from "./$types"

    const toast = getToastStore()

    export let data: PageServerData

    let selectedOutput: any = {}
    let selectedProduct: any = {}

    $: showModal = false
    $: loading = false

    const searchableProducts = data.products.map((product) => ({
        value: product.id,
        label: product.name,
        keywords: product.name.split(" ").join(", ").toLocaleLowerCase(),
    }))

    const handleSubmit = async () => {
        const res = await fetch("/api/output", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedOutput),
        })

        const output = await res.json()

        data.outputs = [...output, data.outputs]

        if (res.ok) {
            toast.trigger({
                message: "Produto retirado com sucesso!",
            })
            showModal = false
            selectedOutput = {}
            selectedProduct = {}
        } else {
            toast.trigger({
                message: "Ocorreu um erro ao retirar o produto.",
            })
        }
    }

    const handleRowClick = (id: string) => {
        selectedOutput = data.outputs.find((output) => output.id === id)
        selectedProduct = data.products.find((product) => product.id === selectedOutput.product)
        showModal = true
    }
</script>

<PageHeader title="Saídas">
    <Button class="w-fit" on:click={() => (showModal = true)}>Retirar Produto</Button>
</PageHeader>

<EmptyWrapper
    title="Sem dados"
    message="Nenhuma saída registrada ainda."
    length={data.outputs.length}>
    <section class="table-container rounded-lg" slot="content">
        <Table
            columns={[
                {
                    label: "Produto",
                    key: "productName",
                    type: "string",
                },
                {
                    label: "Quantidade",
                    key: "amount",
                    type: "number",
                },
                {
                    label: "Preço",
                    key: "price",
                    type: "currency",
                },
                {
                    label: "Data de Saída",
                    key: "created_at",
                    type: "date",
                },
            ]}
            data={data.outputs}
            {handleRowClick} />
    </section>
</EmptyWrapper>

<Modal bind:showModal headerText={isEmpty(selectedOutput) ? "Retirar Produto" : "Alterar Retirada"}>
    <div slot="body" class="flex flex-col gap-y-4 h-full">
        <SelectSearch
            on:selection={(e) => {
                selectedOutput.product = e.detail.value
                selectedProduct = data.products.find((product) => product.id === e.detail.value)
            }}
            name="product"
            id="product"
            label="Produto"
            options={searchableProducts}
            inputValue={selectedProduct.name || ""} />
        <Input
            label="Quantidade"
            id="amount"
            name="amount"
            type="btn-number"
            value={selectedOutput?.amount || ""} />
    </div>
    <svelte:fragment slot="footer">
        <Button
            type="submit"
            id="retrieve_product"
            class="w-full mt-auto"
            on:click={handleSubmit}
            {loading}>Retirar do Estoque</Button>
    </svelte:fragment>
</Modal>
