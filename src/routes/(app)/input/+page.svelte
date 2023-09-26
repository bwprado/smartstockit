<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import SelectSearch from "$lib/components/SelectSearch.svelte"
    import Table from "$lib/components/Table/Table.svelte"
    import { getToastStore } from "@skeletonlabs/skeleton"
    import type { ActionData, PageData } from "./$types"
    import PageHeader from "$lib/components/PageHeader.svelte"
    import EmptyWrapper from "$lib/components/EmptyWrapper.svelte"

    const toast = getToastStore()

    let selectedProduct: any = {}

    export let data: PageData
    export let form: ActionData
    const products = (data?.products || []).map((product) => ({
        name: product.name,
        id: product.id,
    }))

    const searchableProducts = products.map((product) => ({
        label: product.name,
        value: product.id,
        keyword: product.name.split(" ").join(", ").toLowerCase(),
    }))

    $: showModal = false
    $: inputs = data?.inputs || []
    $: isFresh = false
    $: loading = false

    const handleChange = (event: Event) => {
        if (event?.target instanceof HTMLInputElement) {
            isFresh = event?.target?.checked
        }
    }

    if (form?.status) {
        if (form?.status === 200) {
            toast.trigger({
                message: form.body,
            })
        } else {
            toast.trigger({
                message: form.body,
                background: "bg-error-500",
            })
        }
    }

    const handleProductSelection = (e: CustomEvent) => {
        const { detail } = e
        const { value } = detail
        const product = products.find((product) => product.id === value)
        selectedProduct = product
    }
</script>

<PageHeader title="Entradas">
    <Button class="w-fit" on:click={() => (showModal = true)}>Adicionar Entrada</Button>
</PageHeader>

<EmptyWrapper
    title="Sem dados"
    message="Você ainda não realizou nenhuma saída, clique no botão cima para fazê-lo"
    length={inputs.length}>
    <section class="table-container rounded-lg" slot="content">
        <Table
            columns={[
                { label: "Produto", key: "productName", type: "string" },
                { label: "Quantidade", key: "amount", type: "number" },
                { label: "Preço", key: "price", type: "currency" },
                { label: "Data Vencimento", key: "expiration_date", type: "date" },
                { label: "Data Entrada", key: "created_at", type: "date" },
            ]}
            data={inputs} />
    </section>
</EmptyWrapper>

<Modal bind:showModal headerText="Entrada de Produtos" confirmFunction={() => console.log("Test")}>
    <svelte:fragment slot="body">
        <form method="POST" class="flex flex-col gap-y-4 h-full">
            <SelectSearch
                label="Produto"
                options={searchableProducts}
                on:selection={handleProductSelection}
                bind:inputValue={selectedProduct.name}
                id="product"
                name="product" />
            <Input name="amount" id="amount" type="btn-number" label="Quantidade" />
            <Input
                name="price"
                id="price"
                type="number"
                step="0.01"
                label="Preço"
                symbol={{ position: "left", text: "R$" }} />
            <Input
                type="checkbox"
                name="fresh"
                id="fresh"
                label="Produto Fresco"
                on:change={handleChange} />
            <Input
                type="date"
                id="expiration_date"
                label="Data de Vencimento"
                name="expiration_date"
                disabled={isFresh} />
            <Button type="submit" class="mt-auto w-full" on:click={() => (loading = true)} {loading}
                >Adicionar Entrada</Button>
        </form>
    </svelte:fragment>
    <svelte:fragment slot="footer">
        <div></div>
    </svelte:fragment>
</Modal>
