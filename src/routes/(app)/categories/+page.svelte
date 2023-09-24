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
        if (selectedCategory.name) {
            try {
                loading = true
                await fetch(`/api/categories`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(selectedCategory),
                })

            } catch (error) {
                console.log(error)
            }
            loading = false
            showModal = false
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
            columns={[{ label: "Categoria", key: "name", type: "string" }]}
            data={data.categories}
            index={0}
            {handleRowClick} />
    </section>
</EmptyWrapper>

<Modal
    bind:showModal
    confirmFunction={() => console.log("Save adition")}
    headerText={selectedCategory.name ? "Editar Categoria" : "Adicionar Categoria"}>
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
                >{selectedCategory.name ? "Editar" : "Adicionar"}</Button>
        </div>
    </div>
    <svelte:fragment slot="footer">
        <div />
    </svelte:fragment>
</Modal>
