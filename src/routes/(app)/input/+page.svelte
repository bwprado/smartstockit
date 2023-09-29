<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import EmptyWrapper from "$lib/components/EmptyWrapper.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import PageHeader from "$lib/components/PageHeader.svelte"
    import SelectSearch from "$lib/components/SelectSearch.svelte"
    import Table from "$lib/components/Table/Table.svelte"

    import IconButton from "$lib/components/IconButton.svelte"
    import { getModalStore, getToastStore } from "@skeletonlabs/skeleton"
    import { format, parseISO } from "date-fns"
    import { Trash } from "lucide-svelte"
    import type { PageServerData } from "./$types"

    const toast = getToastStore()
    const modal = getModalStore()

    let selectedProduct: any = {}
    let selectedInput: any = {}

    export let data: PageServerData

    const searchableProducts = data.products.map((product) => ({
        label: product.name,
        value: product.id,
        keyword: product.name.split(" ").join(", ").toLowerCase(),
    }))

    $: showModal = false
    $: loading = false

    const handleSubmit = async () => {
        if (!selectedProduct.id) {
            showModal = false
            toast.trigger({
                message: "Selecione um produto",
                background: "bg-error-500",
            })
            return
        }

        if (!selectedInput.amount) {
            showModal = false
            toast.trigger({
                message: "Insira uma quantidade",
                background: "bg-error-500",
            })
            return
        }

        loading = true
        const res = await fetch("/api/input", {
            method: "POST",
            body: JSON.stringify({
                ...selectedInput,
                product: selectedProduct.id,
                fresh: !!selectedInput?.fresh,
            }),
        })

        if (res.ok) {
            const input = await res.json()
            const product = data.products.find((product) => product.id === input.product)
            data.inputs = [...data.inputs, { ...input, productName: product?.name }]

            toast.trigger({
                message: "Entrada adicionada com sucesso",
            })

            loading = false
            showModal = false
        } else {
            toast.trigger({
                message: res.statusText,
                background: "bg-error-500",
            })
            loading = false
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
        selectedProduct = data.products.find((product) => product.id === selectedInput.product)
        selectedInput.expiration_date = selectedInput.expiration_date
            ? format(parseISO(selectedInput.expiration_date), "yyyy-MM-dd")
            : ""
        showModal = true
    }

    const handleDeleteClick = async () => {
        const deleteId = selectedInput.id
        showModal = false
        modal.trigger({
            type: "confirm",
            title: "Excluir Entrada",
            body: "Você tem certeza que deseja excluir essa entrada?",
            buttonTextConfirm: "Excluir",
            buttonTextCancel: "Cancelar",
            response: async (r) => {
                if (!r) return

                loading = true
                const res = await fetch("api/input", {
                    method: "DELETE",
                    body: JSON.stringify(deleteId),
                })

                if (res.ok) {
                    const deleted = await res.json()

                    data.inputs = data.inputs.filter((input) => input.id !== deleted.id)

                    toast.trigger({
                        message: "Entrada excluída com sucesso",
                    })
                } else {
                    toast.trigger({
                        message: res.statusText,
                        background: "bg-error-500",
                    })
                }
                showModal = false
                loading = false
            },
        })
    }
</script>

<PageHeader title="Entradas">
    <Button
        class="w-fit"
        on:click={() => {
            showModal = true
            selectedInput = {}
            selectedProduct = {}
        }}>Adicionar Entrada</Button>
</PageHeader>

<EmptyWrapper
    title="Sem dados"
    message="Você ainda não realizou nenhuma entrada, clique no botão cima para fazê-lo"
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
    headerText={selectedInput.id ? "Alterar Entrada de Produto" : "Entrada de Produtos"}
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
        <div class="flex flex-col gap-y-4 h-full">
            <SelectSearch
                required
                label="Produto"
                options={searchableProducts}
                on:selection={handleProductSelection}
                bind:inputValue={selectedProduct.name}
                id="product"
                name="product" />
            <Input
                required
                name="amount"
                id="amount"
                type="btn-number"
                label="Quantidade"
                bind:value={selectedInput.amount} />
            <Input
                name="price"
                id="price"
                type="number"
                step="0.01"
                label="Preço"
                bind:value={selectedInput.price}
                symbol={{ position: "left", text: "R$" }} />
            <Input
                type="checkbox"
                name="fresh"
                id="fresh"
                label="Produto Fresco"
                bind:checked={selectedInput.fresh} />
            <Input
                bind:value={selectedInput.expiration_date}
                type="date"
                id="expiration_date"
                label="Data de Vencimento"
                name="expiration_date"
                bind:disabled={selectedInput.fresh} />
        </div>
    </svelte:fragment>
    <svelte:fragment slot="footer">
        <Button type="submit" class="mt-auto w-full" on:click={handleSubmit} {loading}
            >Adicionar Entrada</Button>
    </svelte:fragment>
</Modal>
