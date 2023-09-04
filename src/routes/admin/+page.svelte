<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import IconButton from "$lib/components/IconButton.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import Select from "$lib/components/Select.svelte"
    import Table from "$lib/components/Table/Table.svelte"
    import { getModalStore, getToastStore } from "@skeletonlabs/skeleton"
    import { Trash } from "lucide-svelte"
    import type { IProfile } from "../../hooks.server"
    import type { PageData } from "./$types"

    const modal = getModalStore()
    const toast = getToastStore()

    let selectedUser: IProfile | undefined
    export let data: PageData

    $: showModal = false
    $: selectedUser = undefined
    $: loading = false

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
</script>

<svelte:head>
    <title>Inventory - VT / Admin</title>
</svelte:head>

<div class="flex justify-between items-center py-4">
    <h1 class="text-xl font-bold">Usuários</h1>
    <Button id="add_user" intent="primary" type="button" on:click={handleAddButtonClick}
        >Adicionar Usuário</Button
    >
</div>

<div class="table-container">
    <Table
        columns={[
            { label: "Nome", key: "name", type: "string" },
            { label: "Email", key: "email", type: "string" },
            { label: "Tipo", key: "role", type: "string" },
        ]}
        {handleRowClick}
        data={users}
    />
</div>

<Modal
    headerText={selectedUser ? "Editar Usuário" : "Adicionar Usuário"}
    bind:showModal
    confirmFunction={() => console.log("Confirmation modal")}
>
    <svelte:fragment slot="action">
        {#if selectedUser}
            <form method="POST" action="?/deleteUser">
                <IconButton on:click={handleDeleteClick}>
                    <Trash
                        class="text-gray-900 dark:text-primary-500 hover:text-primary-500 dark:hover:text-gray-200"
                    />
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
                value={selectedUser ? selectedUser?.name : ""}
            />
            <Input
                id="email"
                name="email"
                label="Email"
                type="email"
                value={selectedUser ? selectedUser?.email : ""}
                disabled={selectedUser ? true : false}
            />
            <Select
                id="role"
                name="role"
                label="Tipo"
                options={[
                    { name: "Administrador", id: "admin" },
                    { name: "Usuário", id: "user" },
                ]}
                value={selectedUser ? selectedUser?.role : ""}
            />
            <Button
                type="submit"
                id="save_user"
                {loading}
                intent="primary"
                className="w-full mt-auto"
                on:click={() => (loading = true)}>Salvar</Button
            >
        </form>
    </svelte:fragment>
    <svelte:fragment slot="footer">
        <div></div>
    </svelte:fragment>
</Modal>
