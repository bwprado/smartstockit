<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import EmptyWrapper from "$lib/components/EmptyWrapper.svelte"
    import IconButton from "$lib/components/IconButton.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import PageHeader from "$lib/components/PageHeader.svelte"
    import Table from "$lib/components/Table/Table.svelte"

    import { Trash } from "lucide-svelte"
    import { twMerge } from "tailwind-merge"
    import type { PageData } from "./$types"
    import { getToastStore } from "@skeletonlabs/skeleton"

    const toast = getToastStore()

    export let data: PageData

    const handleRowClick = (row: any) => {
        selectedCategory = data.categories.find((category) => category.id === row)
        showModal = true
    }

    type CategoriesForm = {
        name: string
        ref: string
        id: string
    }

    let initialValue: CategoriesForm = {
        ref: "products",
        name: "",
        id: "",
    }

    let selectedCategory = initialValue

    let showModal = false
    let loading = false

    const handleDeleteClick = () => {
        console.log("Delete")
    }
    const handleSubmitCategory = async () => {
        if (selectedCategory.id) {
            try {
                loading = true
                const res = await fetch(`/api/categories`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(selectedCategory),
                })

                const updatedCategory = await res.json()

                data.categories = data.categories.map((category) =>
                    category.id === updatedCategory.id ? updatedCategory : category,
                )
            } catch (error) {
                console.log(error)

                toast.trigger({
                    message: "Ocorreu um erro ao editar a categoria",
                    background: "bg-error-500",
                })
            }
            loading = false
            showModal = false
            return
        }
        try {
            loading = true
            const res = await fetch(`/api/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedCategory),
            })

            const category = await res.json()

            data.categories = [...data.categories, category]

            loading = false
            showModal = false

            toast.trigger({
                message: "Categoria adicionada com sucesso",
            })
        } catch (error) {
            console.log(error)
            toast.trigger({
                message: "Ocorreu um erro ao adicionar a categoria",
                background: "bg-error-500",
            })
        }
    }
</script>

<PageHeader title="Categorias">
    <Button
        class="max-w-max"
        on:click={() => {
            selectedCategory = initialValue
            showModal = true
        }}>Adicionar Categoria</Button>
</PageHeader>
<EmptyWrapper
    message="Nenhuma Categoria adicionada ainda, para adicionar uma categoria basta clicar no botão acima."
    length={data.categories.length}>
    <section class={twMerge("table-container", "rounded-lg")} slot="content">
        <Table
            columns={[
                { label: "Categoria", key: "name", type: "string" },
                { label: "Referência", key: "ref", type: "string" },
            ]}
            data={data.categories}
            index={0}
            {handleRowClick} />
    </section>
</EmptyWrapper>

<Modal
    bind:showModal
    confirmFunction={() => console.log("Save adition")}
    headerText={selectedCategory.id ? "Editar Categoria" : "Adicionar Categoria"}
    closeFunction={() => {
        selectedCategory = initialValue
        showModal = false
    }}>
    <svelte:fragment slot="action">
        {#if selectedCategory}
            <form method="POST" action="?/deleteCategory">
                <IconButton on:click={handleDeleteClick} intent="secondary">
                    <svelte:fragment slot="icon">
                        <Trash />
                    </svelte:fragment>
                </IconButton>
            </form>
        {/if}
    </svelte:fragment>
    <div slot="body" class="grid grid-rows-[auto,max-content] w-full h-full gap-y-4">
        <Input label="Nome" name="name" bind:value={selectedCategory.name} />
        <div class="py-6 sm:py-0">
            <Button id="add_category" on:click={handleSubmitCategory} {loading}
                >{selectedCategory.id ? "Editar" : "Adicionar"}</Button>
        </div>
    </div>
    <svelte:fragment slot="footer">
        <div />
    </svelte:fragment>
</Modal>
