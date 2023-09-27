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
    import { format, parseISO } from "date-fns"
    import IconButton from "$lib/components/IconButton.svelte"
    import { Trash } from "lucide-svelte"

    const toast = getToastStore()

    let selectedProduct: any = {}
    let selectedInput: any = {}

    export let data: PageServerData
    export let form: ActionData

    const searchableProducts = data.products.map((product) => ({
        label: product.name,
        value: product.id,
        keyword: product.name.split(" ").join(", ").toLowerCase(),
    }))

    $: showModal = false
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
        const product = data.products.find((product) => product.id === value)
        selectedProduct = product
    }

    const handleRowClick = (id: string) => {
        selectedInput = data.inputs.find((input) => input.id === id)
        showModal = true
    }

    const handleDeleteClick = async () => {}
</script>

<PageHeader title="Entradas">
    <Button class="w-fit" on:click={() => (showModal = true)}>Adicionar Entrada</Button>
</PageHeader>

<EmptyWrapper
    title="Sem dados"
    message="Você ainda não realizou nenhuma saída, clique no botão cima para fazê-lo"
    length={data.inputs.length}>
    <section class="table-container rounded-lg" slot="content">
        <Table
            columns={[
                { label: "Produto", key: "productName", type: "string" },
                { label: "Quantidade", key: "amount", type: "number" },
                { label: "Preço", key: "price", type: "currency" },
                { label: "Data Vencimento", key: "expiration_date", type: "date" },
                { label: "Data Entrada", key: "created_at", type: "date" },
            ]}
            data={data.inputs}
            {handleRowClick} />
    </section>
</EmptyWrapper>

<Modal
    bind:showModal
    headerText={isEmpty(selectedInput) ? "Entrada de Produtos" : "Alterar Entrada de Produto"}
    on:close={() => {
        selectedInput = {}
        selectedProduct = {}
    }}>
    <svelte:fragment slot="action">
        {#if selectedInput.id}
            <IconButton on:click={handleDeleteClick} intent="secondary">
                <svelte:fragment slot="icon">
                    <Trash />
                </svelte:fragment>
            </IconButton>
        {/if}
    </svelte:fragment>

    <svelte:fragment slot="body">
        <form method="POST" class="flex flex-col gap-y-4 h-full">
            <SelectSearch
                label="Produto"
                options={searchableProducts}
                on:selection={handleProductSelection}
                inputValue={selectedProduct.name || selectedInput?.productName || ""}
                id="product"
                name="product" />
            <Input
                name="amount"
                id="amount"
                type="btn-number"
                label="Quantidade"
                value={selectedInput?.amount + "" || ""} />
            <Input
                value={selectedInput?.price || ""}
                name="price"
                id="price"
                type="number"
                step="0.01"
                label="Preço"
                symbol={{ position: "left", text: "R$" }} />
            <Input
                value={selectedInput.fresh || false}
                type="checkbox"
                name="fresh"
                id="fresh"
                label="Produto Fresco"
                on:change={handleChange} />
            <Input
                value={selectedInput.expiration_date
                    ? format(parseISO(selectedInput.expiration_date), "yyyy-MM-dd")
                    : ""}
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
