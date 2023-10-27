<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import EmptyWrapper from "$lib/components/EmptyWrapper.svelte"
    import IconButton from "$lib/components/IconButton.svelte"
    import Input from "$lib/components/Input.svelte"
    import InputMasked from "$lib/components/InputMasked.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import PageHeader from "$lib/components/PageHeader.svelte"
    import Table from "$lib/components/Table/Table.svelte"

    import { getModalStore, getToastStore } from "@skeletonlabs/skeleton"
    import { Plus, Trash } from "lucide-svelte"
    import { twMerge } from "tailwind-merge"
    import type { Supplier } from "../../../../types/supabase"
    import type { PageServerData } from "./$types"

    const toast = getToastStore()
    const modal = getModalStore()

    export let data: PageServerData

    $: showModal = false
    $: loading = false
    $: selectedSupplier = {
        name: "",
        id: "",
        email: "",
        phone: "",
    }

    const handleRowClick = (id: string) => {
        selectedSupplier = data.suppliers.find((s) => s.id === id)
        showModal = true
    }

    const handleSubmit = async () => {
        loading = true
        try {
            if (selectedSupplier.id) {
                const res = await fetch(`/api/suppliers`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: selectedSupplier.id,
                        name: selectedSupplier.name,
                    }),
                })

                const updatedSupplier: Supplier = await res.json()

                data.suppliers = data.suppliers.map((b) =>
                    b.id === updatedSupplier.id ? updatedSupplier : b,
                )

                toast.trigger({
                    message: "Fornecedor editada com sucesso.",
                })
            } else {
                const res = await fetch(`/api/suppliers`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: selectedSupplier.name,
                    }),
                })

                const newSupplier: Supplier = await res.json()

                data.suppliers = [...data.suppliers, newSupplier]

                toast.trigger({
                    message: "Fornecedor adicionado com sucesso.",
                })
            }
        } catch (error) {
            console.log(error)
            toast.trigger({
                message: "Ocorreu um erro ao adicionar o fornecedor, tente novamente mais tarde.",
            })
        }
        showModal = false
        loading = false
    }

    const handleDeleteClick = async () => {
        const brandId = selectedSupplier.id
        showModal = false
        modal.trigger({
            title: "Deletar Fornecedor",
            type: "confirm",
            body: "Você tem certeza que deseja deletar esse fornecedor?",
            response: async (r) => {
                if (r) {
                    try {
                        const res = await fetch(`/api/suppliers`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                id: brandId,
                            }),
                        })
                        const deletedSuppliers: Supplier = await res.json()

                        data.suppliers = data.suppliers.filter((b) => b.id !== deletedSuppliers.id)

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

<PageHeader title="Fornecedores" class="pb-4">
    <Button
        slot="action"
        class="max-w-max"
        on:click={() => {
            selectedSupplier = {
                name: "",
                id: "",
                email: "",
                phone: "",
            }
            showModal = true
        }}><Plus />Fornecedor</Button>
</PageHeader>
<EmptyWrapper
    length={data.suppliers.length}
    message="Você ainda não possuí nenhuma marca cadastrada, para cadastrar clique no botão acima."
    title="Nenhuma Marca Cadastrada">
    <section class={twMerge("table-container", "rounded-lg")} slot="content">
        <Table
            columns={[
                { label: "Fornecedor", key: "name", type: "string" },
                { label: "Email", key: "email", type: "string" },
                { label: "Telefone", key: "phone", type: "string" },
            ]}
            data={data.suppliers}
            {handleRowClick} />
    </section>
</EmptyWrapper>

<Modal
    bind:showModal
    position="right"
    headerText={selectedSupplier.name ? "Editar Fornecedor" : "Adicionar Fornecedor"}
    closeFunction={() => {
        selectedSupplier = {
            name: "",
            id: "",
            email: "",
            phone: "",
        }
    }}>
    <svelte:fragment slot="action">
        {#if selectedSupplier.name}
            <IconButton on:click={handleDeleteClick} intent="secondary">
                <svelte:fragment slot="icon">
                    <Trash />
                </svelte:fragment>
            </IconButton>
        {/if}
    </svelte:fragment>

    <div slot="body" class="flex flex-col w-full gap-6">
        <Input
            label="Nome do Fornecedor"
            placeholder="ex: Lojas Americanas"
            bind:value={selectedSupplier.name}
            id="name"
            name="name"
            type="text" />
        <Input
            label="Email"
            placeholder="supermercado@gmail.com"
            bind:value={selectedSupplier.email}
            id="email"
            name="email"
            type="email" />
        <InputMasked
            label="Telefone"
            placeholder="(98) 991150154"
            bind:value={selectedSupplier.phone}
            id="phone"
            name="phone" />
    </div>
    <svelte:fragment slot="footer">
        <div class="py-6 sm:py-0">
            <Button id="add-supplier" on:click={handleSubmit} {loading}
                >{selectedSupplier.id ? "Editar" : "Adicionar"}</Button>
        </div>
    </svelte:fragment>
</Modal>
