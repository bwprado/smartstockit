<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import IconButton from "$lib/components/IconButton.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import Select from "$lib/components/Select.svelte"
    import Table from "$lib/components/Table/Table.svelte"

    import { applyAction, deserialize } from "$app/forms"
    import { Tab, TabGroup, getModalStore, getToastStore } from "@skeletonlabs/skeleton"
    import type { ActionResult } from "@sveltejs/kit"
    import { Trash } from "lucide-svelte"
    import type { Profile } from "../../../types/supabase"
    import type { PageData } from "./$types"

    const modal = getModalStore()
    const toast = getToastStore()

    let selectedUser: Profile | undefined
    export let data: PageData

    $: showModal = false
    $: showAddUnitModal = false
    $: selectedUser = undefined
    $: newUnit = {
        name: "",
        acronym: "",
    }
    $: loading = false
    $: units = data?.units ?? []
    const users = data?.users ?? []

    const handleRowClick = (id: string) => {
        selectedUser = users.find((user) => user.id === id) || undefined
        showModal = true
    }

    const handleAddButtonClick = () => {
        selectedUser = undefined
        showModal = true
    }

    const handleDeleteClick = () => {
        showModal = false
        modal.trigger({
            type: "confirm",
            title: "Deletar Usuário",
            body: "Tem certeza que deseja deletar este usuário?",
            response: async (response) => {
                if (response) {
                    const res = await fetch(
                        `/api/delete-user?id=${selectedUser?.id || undefined}`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        },
                    )
                    const { error, message } = (await res.json()) || {}

                    if (error) {
                        console.log(error)

                        toast.trigger({
                            message: error?.message || "Erro ao deletar usuário",
                        })
                    }

                    if (message) {
                        toast.trigger({
                            message: message,
                        })
                    }
                }
            },
        })
    }

    let tabSet: number = 0

    const handleAddUnitSubmit = async (e: { currentTarget: EventTarget & HTMLFormElement }) => {
        const data = new FormData(e.currentTarget)

        const response = await fetch(e.currentTarget.action, {
            method: "POST",
            body: data,
        })

        const result: ActionResult = deserialize(await response.text())

        if (result.type === "success") {
            units = [...units, result?.data?.body]
            showAddUnitModal = false
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

<TabGroup>
    <Tab bind:group={tabSet} name="users" value={0}>
        <div class="text-sm flex flex-col items-center justify-center gap-y-2">
            <span>Usuários</span>
        </div>
    </Tab>
    <Tab bind:group={tabSet} name="categories" value={1}>
        <div class="text-sm flex flex-col items-center justify-center gap-y-2">
            <span>Unidades</span>
        </div>
    </Tab>
    <svelte:fragment slot="panel">
        {#if tabSet === 0}
            <div class="flex flex-col sm:flex-row justify-between items-center pb-10 gap-4">
                <h1 class="text-xl font-bold whitespace-nowrap">Usuários</h1>
                <Button id="add_user" intent="primary" type="button" class="w-fit" disabled
                    >Adicionar Usuário</Button>
            </div>

            <div class="table-container rounded-lg">
                <Table
                    columns={[
                        { label: "Nome", key: "name", type: "string" },
                        { label: "Email", key: "email", type: "string" },
                        { label: "Tipo", key: "role", type: "string" },
                    ]}
                    {handleRowClick}
                    data={users} />
            </div>
        {:else if tabSet === 1}
            <div class="flex flex-col sm:flex-row justify-between items-center pb-10 gap-4">
                <div class="flex flex-col">
                    <h1 class="text-xl font-bold whitespace-nowrap">Unidades de medida</h1>
                    <p class="text-xs text-surface-400">
                        Você pode adicionar as unidades de medida necessárias para controlar seu
                        estoque.
                    </p>
                </div>
                <Button
                    id="add_unit"
                    intent="primary"
                    type="button"
                    class="w-fit"
                    on:click={() => (showAddUnitModal = true)}>Adicionar Unidade</Button>
            </div>
            <Table
                columns={[
                    { label: "Unidade", key: "name", type: "string" },
                    { label: "Acrônimo", key: "acronym", type: "string" },
                ]}
                {handleRowClick}
                data={units} />
        {:else if tabSet === 2}
            (tab panel 3 contents)
        {/if}
    </svelte:fragment>
</TabGroup>

<Modal
    headerText={selectedUser ? "Editar Usuário" : "Adicionar Usuário"}
    bind:showModal
    confirmFunction={() => console.log("Confirmation modal")}>
    <svelte:fragment slot="action">
        {#if selectedUser}
            <form method="POST" action="?/deleteUser">
                <IconButton on:click={handleDeleteClick}>
                    <Trash
                        class="text-gray-900 dark:text-primary-500 hover:text-primary-500 dark:hover:text-gray-200" />
                </IconButton>
            </form>
        {/if}
    </svelte:fragment>
    <svelte:fragment slot="body">
        <form method="POST" action="?/addUser" class="flex flex-col h-full gap-y-4">
            <Input
                id="name"
                name="name"
                label="Nome"
                type="text"
                value={selectedUser ? selectedUser?.name : ""} />
            <Input
                id="email"
                name="email"
                label="Email"
                type="email"
                value={selectedUser ? selectedUser?.email : ""}
                disabled={selectedUser ? true : false} />
            <Select
                id="role"
                name="role"
                label="Tipo"
                options={[
                    { name: "Administrador", id: "admin" },
                    { name: "Usuário", id: "user" },
                ]}
                value={selectedUser ? selectedUser?.role : ""} />
            <Button
                type="submit"
                id="save_user"
                {loading}
                intent="primary"
                class="w-full mt-auto"
                on:click={() => (loading = true)}>Salvar</Button>
        </form>
    </svelte:fragment>
    <svelte:fragment slot="footer">
        <div></div>
    </svelte:fragment>
</Modal>

<Modal
    headerText="Adicionar Unidade"
    bind:showModal={showAddUnitModal}
    confirmFunction={() => console.log("Confirmation modal")}
    position="right">
    <svelte:fragment slot="action">
        {#if selectedUser}
            <form method="POST" action="?/deleteUser">
                <IconButton on:click={handleDeleteClick}>
                    <Trash
                        class="text-gray-900 dark:text-primary-500 hover:text-primary-500 dark:hover:text-gray-200" />
                </IconButton>
            </form>
        {/if}
    </svelte:fragment>
    <svelte:fragment slot="body">
        <form
            method="POST"
            action="?/addUnit"
            class="flex flex-col h-full gap-y-4"
            on:submit|preventDefault={handleAddUnitSubmit}>
            <Input id="unit" name="unit" label="Unidade" type="text" value={newUnit.name} />
            <Input
                id="acronym"
                name="acronym"
                label="Acrônimo"
                type="acronym"
                value={newUnit.acronym} />
            <Button
                type="submit"
                id="save_user"
                {loading}
                intent="primary"
                class="w-full mt-auto"
                on:click={() => (loading = true)}>Salvar</Button>
        </form>
    </svelte:fragment>
    <svelte:fragment slot="footer">
        <div></div>
    </svelte:fragment>
</Modal>
