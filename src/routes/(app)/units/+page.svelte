<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import IconButton from "$lib/components/IconButton.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import PageHeader from "$lib/components/PageHeader.svelte"
    import Table from "$lib/components/Table/Table.svelte"
    
    import { getModalStore, getToastStore } from "@skeletonlabs/skeleton"
    import { Plus, Trash } from "lucide-svelte"
    import type { Unit } from "../../../types/supabase"
    import type { PageServerData } from "./$types"

    const toast = getToastStore()
    const modal = getModalStore()

    export let data: PageServerData

    $: showModal = false
    $: loading = false
    $: selectedUnit = {
        id: "",
        name: "",
        acronym: "",
    }

    const handleDeleteClick = () => {
        const unitId = selectedUnit.id
        showModal = false
        modal.trigger({
            type: "confirm",
            title: "Remover Unidade",
            body: "Você tem certeza que deseja remover esta unidade? Esta ação não poderá ser desfeita.",
            response: async (response) => {
                if (response) {
                    loading = true
                    try {
                        const res = await fetch(`/api/units?id=${unitId}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                        const unit = (await res.json()) || {}
                        data.units = data.units.filter((u) => u.id !== unit.id)

                        toast.trigger({
                            message: "Unidade removida com sucesso!",
                        })
                    } catch (error) {
                        console.log(error)

                        toast.trigger({
                            message: "Erro ao remover unidade",
                        })
                    }
                    loading = false
                }
            },
        })
    }

    const handleSubmit = async () => {
        if (!selectedUnit.name || !selectedUnit.acronym) {
            showModal = false
            toast.trigger({
                message: `${selectedUnit.name ? "Acrônimo" : "Nome"} é obrigatório.`,
                background: "bg-error-500",
            })
            return
        }
        try {
            if (selectedUnit.id) {
                loading = true
                const res = await fetch(`/api/units`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: selectedUnit.id,
                        name: selectedUnit.name,
                        acronym: selectedUnit.acronym,
                    }),
                })

                const updatedUnit: Unit = await res.json()

                data.units = data.units.map((u) => (u.id === updatedUnit.id ? updatedUnit : u))

                toast.trigger({
                    message: "Unidade editada com sucesso.",
                })
            } else {
                const res = await fetch(`/api/units`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: selectedUnit.name,
                        acronym: selectedUnit.acronym,
                    }),
                })

                const newUnit: Unit = await res.json()

                data.units = [...data.units, newUnit]

                toast.trigger({
                    message: "Unidade adicionada com sucesso.",
                })
            }
        } catch (error) {
            console.log(error)
            toast.trigger({
                message: "Ocorreu um erro ao adicionar a unidade, tente novamente mais tarde.",
            })
        }
        loading = false
        showModal = false
    }

    const handleRowClick = (id: Unit["id"]) => {
        selectedUnit = data.units.find((u) => u.id === id)
        showModal = true
    }
</script>

<PageHeader title="Unidades de Medida" class="pb-4">
    <Button
        slot="action"
        class="max-w-max"
        on:click={() => {
            selectedUnit = {
                id: "",
                name: "",
                acronym: "",
            }
            showModal = true
        }}><Plus />Medida</Button>
</PageHeader>
<Table
    columns={[
        { label: "Nome da Unidade", key: "name", type: "string" },
        { label: "Acrônimo", key: "acronym", type: "string" },
    ]}
    data={data.units}
    {handleRowClick} />

<Modal
    bind:showModal
    position="right"
    headerText={selectedUnit.id ? "Editar Unidade" : "Adicionar Unidade"}>
    <svelte:fragment slot="action">
        {#if selectedUnit.id}
            <IconButton on:click={handleDeleteClick} intent="secondary">
                <svelte:fragment slot="icon">
                    <Trash />
                </svelte:fragment>
            </IconButton>
        {/if}
    </svelte:fragment>

    <div slot="body" class="flex flex-col gap-y-4">
        <Input
            required
            label="Nome da Unidade"
            placeholder="Ex: Quilograma"
            bind:value={selectedUnit.name}
            id="name"
            name="name"
            type="text" />
        <Input
            required
            label="Acrônimo"
            placeholder="Ex: kg"
            bind:value={selectedUnit.acronym}
            id="acronym"
            name="acronym"
            type="text" />
    </div>
    <svelte:fragment slot="footer">
        <div class="py-6 sm:py-0">
            <Button id="add_product" on:click={handleSubmit} {loading}
                >{selectedUnit.id ? "Editar" : "Adicionar"}</Button>
        </div>
    </svelte:fragment>
</Modal>
