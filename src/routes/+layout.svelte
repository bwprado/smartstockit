<script lang="ts">
    import "../app.css"
    import { page } from "$app/stores"
    import { AppShell, Toast, initializeStores } from "@skeletonlabs/skeleton"
    import type { LayoutData } from "./$types"

    import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
    import Header from "$lib/components/Header.svelte"
    import Sidebar from "$lib/components/Sidebar.svelte"

    initializeStores()

    export let data: LayoutData
    const { user } = data || {}
</script>

<Toast />

<svelte:head>
    <title>Inventory VT {$page.url.pathname}</title>
</svelte:head>

<AppShell>
    <svelte:fragment slot="header">
        <Header session={data?.session || false} user={data?.user} />
    </svelte:fragment>
    <Breadcrumbs />
    <svelte:fragment slot="sidebarLeft">
        {#if user}
            <Sidebar
                navItems={[
                    { label: "Home", link: "/" },
                    { label: "Admin", link: "/admin" },
                    { label: "Dashboard", link: "/dashboard" },
                    { label: "Produtos", link: "/products" },
                    { label: "Entradas", link: "/input" },
                    { label: "Saídas", link: "/output" },
                ]}
            />
        {/if}
    </svelte:fragment>

    <div class="px-4 lg:px-28">
        <slot />
    </div>
    <svelte:fragment slot="pageFooter">
        <footer class="flex justify-center items-center">
            <p class="text-xs py-4">
                <a class="font-bold" href="mailto:bwprado@gmail.com">Working In Progress Dev </a> - All rights reserved 2023.
            </p>
        </footer>
    </svelte:fragment>
</AppShell>
