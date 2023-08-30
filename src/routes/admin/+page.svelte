<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import Table from "$lib/components/Table/Table.svelte"
    import type { PageData } from "./$types"

    export let data: PageData

    const users = data?.users ?? []
</script>

<svelte:head>
    <title>Inventory - VT / Admin</title>
</svelte:head>

<div class="flex justify-between items-center py-4">
    <h1 class="text-xl font-bold">Usuários</h1>
    <Button>Adicionar Usuário</Button>
</div>

<div class="table-container">
    <Table
        columns={[
            { label: "Nome", key: "name", type: "string" },
            { label: "Email", key: "email", type: "string" },
            { label: "Tipo", key: "role", type: "string" },
        ]}
        data={users}
    />
</div>
