<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import IconButton from "$lib/components/IconButton.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import PageHeader from "$lib/components/PageHeader.svelte"
    import Table from "$lib/components/Table/Table.svelte"
    import { Trash } from "lucide-svelte"
    import type { PageServerData } from "./$types"
    import { getModalStore, getToastStore } from "@skeletonlabs/skeleton"
    import type { ActionResult } from "@sveltejs/kit"
    import { applyAction, deserialize } from "$app/forms"

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
    $: newUnit = {
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
                }
            },
        })
    }

    const handleAddUnitSubmit = async (e: { currentTarget: EventTarget & HTMLFormElement }) => {
        const formData = new FormData(e.currentTarget)

        const response = await fetch(e.currentTarget.action, {
            method: "POST",
            body: formData,
        })

        const result: ActionResult = deserialize(await response.text())

        if (result.type === "success") {
            data.units = [...data.units, result?.data?.body]
            showModal = false
            toast.trigger({
                message: "Unidade adicionada com sucesso",
            })
        } else {
            toast.trigger({
                message: "Erro ao adicionar unidade",
            })
        }
        newUnit = {
            name: "",
            acronym: "",
        }
        loading = false
        applyAction(result)
    }
</script>

<PageHeader title="Unidades de Medida">
    <Button
        class="max-w-max"
        on:click={() => {
            selectedUnit = {
                id: "",
                name: "",
                acronym: "",
            }
            showModal = true
        }}>Adicionar Medida</Button>
</PageHeader>
<Table
    columns={[
        { label: "Nome da Unidade", key: "name", type: "string" },
        { label: "Acrônimo", key: "acronym", type: "string" },
    ]}
    data={data.units} />

<Modal
    bind:showModal
    position="right"
    headerText={selectedUnit.name ? "Editar Unidade" : "Adicionar Unidade"}>
    <svelte:fragment slot="action">
        {#if selectedUnit.name}
            <form method="POST" action="?/deleteUser">
                <IconButton on:click={handleDeleteClick} intent="secondary">
                    <svelte:fragment slot="icon">
                        <Trash />
                    </svelte:fragment>
                </IconButton>
            </form>
        {/if}
    </svelte:fragment>

    <div slot="body">
        <Input
            label="Nome da Unidade"
            placeholder="Ex: Quilograma"
            bind:value={selectedUnit.name}
            id="name"
            name="name"
            type="text" />
    </div>
</Modal>
