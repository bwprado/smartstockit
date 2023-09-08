<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import IconButton from "$lib/components/IconButton.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import Select from "$lib/components/Select.svelte"
    import Table from "$lib/components/Table/Table.svelte"
    import { Trash } from "lucide-svelte"
    import type { ActionData, PageData } from "./$types"
    import { getModalStore, getToastStore } from "@skeletonlabs/skeleton"
    import { invalidate, invalidateAll } from "$app/navigation"
    import SelectSearch from "$lib/components/SelectSearch.svelte"
    import { twMerge } from "tailwind-merge"

    const toast = getToastStore()
    const modal = getModalStore()

    export let data: PageData
    export let form: ActionData

    let selectedProduct: PageData["products"][0] | undefined

    $: showModal = false
    $: selectedProduct
    $: loading = false
    $: products = data?.products || []
    $: categories = data?.categories || []

    const handleRowClick = (id: string) => {
        selectedProduct = products.find((product) => product.id === id) || undefined
        showModal = true
    }

    if (form?.status) {
        toast.trigger({
            message: form.body,
        })
    }

    const handleDeleteClick = () => {
        showModal = false
        modal.trigger({
            type: "confirm",
            title: "Deletar Produto",
            body: "Tem certeza que deseja deletar este produto?",
            response: async (response) => {
                if (response) {
                    const res = await fetch(
                        `/api/delete-product?id=${selectedProduct?.id || undefined}`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        },
                    )
                    const data = (await res.json()) || {}
                    const { error } = data
                    if (error) {
                        console.log(error)

                        toast.trigger({
                            message: "Erro ao deletar produto, entre em contato com o suporte.",
                        })
                    } else {
                        invalidateAll()
                        toast.trigger({
                            message: "Produto deletado com sucesso",
                        })
                    }
                }
            },
        })
    }
</script>

<div class="flex flex-col gap-y-10 w-full">
    <section class="flex flex-col sm:flex-row justify-between gap-4 pt-8">
        <h1 class="text-xl sm:text-2xl font-bold whitespace-nowrap">Lista de Produtos</h1>
        <Button
            className="max-w-max"
            on:click={() => {
                selectedProduct = undefined
                showModal = true
            }}>Adicionar Produto</Button>
    </section>

    <section class={twMerge("table-container", "rounded-md")}>
        <Table
            columns={[
                { label: "Nome", key: "name", type: "string" },
                { label: "Unidade", key: "unit", type: "string" },
                { label: "Saldo", key: "balance", type: "number" },
                { label: "Minínmo", key: "min", type: "number" },
                { label: "Máximo", key: "max", type: "number" },
                { label: "Aviso", key: "warning", type: "boolean" },
                { label: "Categoria", key: "category", type: "string" },
            ]}
            data={products}
            index={0}
            {handleRowClick} />
    </section>
</div>

<Modal
    bind:showModal
    confirmFunction={() => console.log("Save adition")}
    headerText={selectedProduct ? "Editar Produto" : "Adicionar Produto"}>
    <svelte:fragment slot="action">
        {#if selectedProduct}
            <form method="POST" action="?/deleteUser">
                <IconButton on:click={handleDeleteClick}>
                    <Trash
                        class="text-gray-900 dark:text-primary-500 hover:text-primary-500 dark:hover:text-gray-200" />
                </IconButton>
            </form>
        {/if}
    </svelte:fragment>
    <form
        slot="body"
        method="POST"
        class="grid grid-rows-[auto,max-content] w-full h-full"
        action={selectedProduct ? "?/editProduct" : "?/addProduct"}>
        <div class="flex flex-col w-full gap-6">
            <Input
                label="Nome"
                name="name"
                type="text"
                id="name"
                required
                value={selectedProduct?.name || ""} />
            <Input label="Código" name="code" type="text" value={selectedProduct?.code || ""} />
            <SelectSearch label="Categoria" options={categories} id="category" name="category" />
            <div class="grid grid-cols-2 gap-x-4">
                <Input
                    label="Quantidade Mínima"
                    name="min"
                    id="min"
                    type="btn-number"
                    value={selectedProduct?.min || ""} />
                <Input
                    label="Quantidade Máxima"
                    name="max"
                    id="max"
                    type="btn-number"
                    value={selectedProduct?.max || ""} />
            </div>
            <Input
                label="Aviso de Quantidade Mínima"
                name="warning"
                id="warning"
                type="checkbox"
                value={selectedProduct?.warning || ""} />
            <Select
                label="Unidade"
                name="unit"
                value={selectedProduct?.unit || ""}
                options={[
                    { name: "und", id: "und" },
                    { name: "kg", id: "kg" },
                    { name: "l", id: "l" },
                ]}
                id="unit" />
            {#if selectedProduct}
                <Input name="id" id="id" value={selectedProduct.id} type="hidden" />
            {/if}
        </div>
        <Button type="submit" id="add_product" on:click={() => (loading = true)} {loading}
            >{selectedProduct ? "Editar" : "Adicionar"}</Button>
    </form>
    <svelte:fragment slot="footer">
        <div />
    </svelte:fragment>
</Modal>
