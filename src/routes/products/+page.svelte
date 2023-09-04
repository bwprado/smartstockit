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

    const toast = getToastStore()
    const modal = getModalStore()

    export let data: PageData
    export let form: ActionData

    let selectedProduct: PageData["products"][0] | undefined

    $: showModal = false
    $: selectedProduct
    $: loading = false
    $: products = data?.products || []

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
    <section class="flex justify-between">
        <h1 class="text-2xl font-bold">Lista de Produtos</h1>
        <Button
            on:click={() => {
                selectedProduct = undefined
                showModal = true
            }}>Adicionar Produto</Button
        >
    </section>

    <section class="table-container">
        <Table
            columns={[
                { label: "Nome", key: "name", type: "string" },
                { label: "Unidade", key: "unit", type: "string" },
                { label: "Saldo", key: "balance", type: "number" },
            ]}
            data={products}
            index={1}
            {handleRowClick}
        />
    </section>
</div>

<Modal
    bind:showModal
    confirmFunction={() => console.log("Save adition")}
    headerText={selectedProduct ? "Editar Produto" : "Adicionar Produto"}
>
    <svelte:fragment slot="action">
        {#if selectedProduct}
            <form method="POST" action="?/deleteUser">
                <IconButton on:click={handleDeleteClick}>
                    <Trash
                        class="text-gray-900 dark:text-primary-500 hover:text-primary-500 dark:hover:text-gray-200"
                    />
                </IconButton>
            </form>
        {/if}
    </svelte:fragment>
    <form
        slot="body"
        method="POST"
        class="grid grid-rows-[auto,max-content] w-full h-full"
        action={selectedProduct ? "?/editProduct" : "?/addProduct"}
    >
        <div class="flex flex-col w-full">
            <Input
                label="Nome"
                name="name"
                type="text"
                required
                value={selectedProduct?.name || ""}
            />
            <Select
                label="Unidade"
                name="unit"
                value={selectedProduct?.unit || ""}
                options={[
                    { name: "und", id: "und" },
                    { name: "kg", id: "kg" },
                    { name: "l", id: "l" },
                ]}
                id="unit"
            />
            {#if selectedProduct}
                <Input name="id" id="id" value={selectedProduct.id} type="hidden" />
            {/if}
        </div>
        <Button type="submit" id="add_product" on:click={() => (loading = true)} {loading}
            >{selectedProduct ? "Editar" : "Adicionar"}</Button
        >
    </form>
    <svelte:fragment slot="footer">
        <div />
    </svelte:fragment>
</Modal>
