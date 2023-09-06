<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import type { PageData } from "./$types"

    export let data: PageData
    const { user } = data || {}
</script>

<svelte:head>
    <title>Inventory</title>
</svelte:head>

<div class="flex items-center justify-center w-full h-max">
    <div class="text-center px-4 sm:px-0 flex items-center flex-col justify-center">
        <h1 class="text-6xl font-bold mb-6">Inventory</h1>
        <p class="text-2xl mb-8">Seja bem vindo {user?.name}</p>
        <Button href="/dashboard">Comece Agora</Button>
    </div>
</div>
