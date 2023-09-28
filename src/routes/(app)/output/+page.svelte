<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import EmptyWrapper from "$lib/components/EmptyWrapper.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import PageHeader from "$lib/components/PageHeader.svelte"
    import SelectSearch from "$lib/components/SelectSearch.svelte"
    import Table from "$lib/components/Table/Table.svelte"
    import { getToastStore } from "@skeletonlabs/skeleton"
    import type { ActionData, PageServerData } from "./$types"
    import { isEmpty } from "lodash"

    const toast = getToastStore()

    export let data: PageServerData
    export let form: ActionData

    let selectedOutput: any = {}
    let selectedProduct: any = {}

    const products = data?.products || []
    const outputs = data?.outputs || []

    $: showModal = false
    $: loading = false

    const searchableProducts = products.map((product) => ({
        value: product.id,
        label: product.name,
        keywords: product.name.split(" ").join(", ").toLocaleLowerCase(),
    }))

    if (form?.status) {
        if (form?.status === 500) {
            toast.trigger({
                message: form.body,
                background: "bg-red-500",
            })
        } else {
            toast.trigger({
                message: form.body,
            })
        }
    }

    const handleRowClick = (id: string) => {
        selectedOutput = data.outputs.find((output) => output.id === id)
        selectedProduct = products.find((product) => product.id === selectedOutput.product)
        showModal = true
    }
</script>

<PageHeader title="Saídas">
    <Button class="w-fit" on:click={() => (showModal = true)}>Retirar Produto</Button>
</PageHeader>

<EmptyWrapper title="Sem dados" message="Nenhuma saída registrada ainda." length={outputs.length}>
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
            data={outputs}
            {handleRowClick} />
    </section>
</EmptyWrapper>

<Modal bind:showModal headerText={isEmpty(selectedOutput) ? "Retirar Produto" : "Alterar Retirada"}>
    <form slot="body" method="POST" class="flex flex-col gap-y-4 h-full">
        <SelectSearch
            on:selection={(e) => {
                selectedOutput.product = e.detail.value
                selectedProduct = products.find((product) => product.id === e.detail.value)
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
        <Button
            type="submit"
            id="retrieve_product"
            class="w-full mt-auto"
            on:click={() => (loading = true)}
            {loading}>Retirar do Estoque</Button>
    </form>
    <svelte:fragment slot="footer">
        <div />
    </svelte:fragment>
</Modal>
