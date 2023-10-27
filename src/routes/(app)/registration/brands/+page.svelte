<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import EmptyWrapper from "$lib/components/EmptyWrapper.svelte"
    import IconButton from "$lib/components/IconButton.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import PageHeader from "$lib/components/PageHeader.svelte"
    import Table from "$lib/components/Table/Table.svelte"
    import { getModalStore, getToastStore } from "@skeletonlabs/skeleton"
    import { Plus, Trash } from "lucide-svelte"
    import { twMerge } from "tailwind-merge"
    import type { Brand } from "../../../../types/supabase"
    import type { PageServerData } from "./$types"

    const toast = getToastStore()
    const modal = getModalStore()

    export let data: PageServerData

    $: showModal = false
    $: loading = false
    $: selectedBrand = {
        name: "",
        id: "",
    }

    const handleRowClick = (id: string) => {
        selectedBrand = data.brands.find((brand) => brand.id === id)
        showModal = true
    }

    const handleSubmit = async () => {
        loading = true
        try {
            if (selectedBrand.id) {
                const res = await fetch(`/api/brands`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: selectedBrand.id,
                        name: selectedBrand.name,
                    }),
                })

                const updatedBrand: Brand = await res.json()

                data.brands = data.brands.map((b) => (b.id === updatedBrand.id ? updatedBrand : b))

                toast.trigger({
                    message: "Marca editada com sucesso.",
                })
            } else {
                const res = await fetch(`/api/brands`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: selectedBrand.name,
                    }),
                })

                const newBrand: Brand = await res.json()

                data.brands = [...data.brands, newBrand]

                toast.trigger({
                    message: "Marca adicionada com sucesso.",
                })
            }
        } catch (error) {
            console.log(error)
            toast.trigger({
                message: "Ocorreu um erro ao adicionar a marca, tente novamente mais tarde.",
            })
        }
        showModal = false
        loading = false
    }

    const handleDeleteClick = async () => {
        const brandId = selectedBrand.id
        showModal = false
        modal.trigger({
            title: "Deletar Marca",
            type: "confirm",
            body: "Você tem certeza que deseja deletar essa marca?",
            response: async (r) => {
                if (r) {
                    try {
                        const res = await fetch(`/api/brands`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                id: brandId,
                            }),
                        })
                        const deletedBrand: Brand = await res.json()

                        data.brands = data.brands.filter((b) => b.id !== deletedBrand.id)

                        toast.trigger({
                            message: "Marca deletada com sucesso.",
                        })
                    } catch (error) {
                        console.log(error)
                        toast.trigger({
                            message:
                                "Ocorreu um erro ao deletar a marca, tente novamente mais tarde.",
                        })
                    }
                }
            },
        })
    }
</script>

<PageHeader title="Marcas" class="pb-4">
    <Button
        slot="action"
        class="max-w-max"
        on:click={() => {
            selectedBrand = {
                name: "",
                id: "",
            }
            showModal = true
        }}><Plus />Marca</Button>
</PageHeader>
<EmptyWrapper
    length={data.brands.length}
    message="Você ainda não possuí nenhuma marca cadastrada, para cadastrar clique no botão acima."
    title="Nenhuma Marca Cadastrada">
    <section class={twMerge("table-container", "rounded-lg")} slot="content">
        <Table
            columns={[
                { label: "Marca", key: "name", type: "string" },
                { label: "Status", key: "status", type: "string" },
            ]}
            {handleRowClick}
            data={data.brands} />
    </section>
</EmptyWrapper>

<Modal
    bind:showModal
    position="right"
    headerText={selectedBrand.name ? "Editar Marca" : "Adicionar Marca"}
    closeFunction={() => {
        selectedBrand = {
            name: "",
            id: "",
        }
    }}>
    <svelte:fragment slot="action">
        {#if selectedBrand.name}
            <IconButton on:click={handleDeleteClick} intent="secondary">
                <svelte:fragment slot="icon">
                    <Trash />
                </svelte:fragment>
            </IconButton>
        {/if}
    </svelte:fragment>

    <div slot="body">
        <Input
            required
            label="Nome da Marca"
            placeholder="Ex: Bombril"
            bind:value={selectedBrand.name}
            id="name"
            name="name"
            type="text" />
    </div>
    <svelte:fragment slot="footer">
        <div class="py-6 sm:py-0">
            <Button id="add_product" on:click={handleSubmit} {loading}
                >{selectedBrand.id ? "Editar" : "Adicionar"}</Button>
        </div>
    </svelte:fragment>
</Modal>
