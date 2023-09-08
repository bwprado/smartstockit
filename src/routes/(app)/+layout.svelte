<script lang="ts">
    import { page } from "$app/stores"
    import { arrow, autoUpdate, computePosition, flip, offset, shift } from "@floating-ui/dom"
    import { AppShell, Modal, Toast, initializeStores, storePopup } from "@skeletonlabs/skeleton"
    import "../../app.css"
    import type { LayoutData } from "./$types"

    import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
    import Header from "$lib/components/Header.svelte"
    import Sidebar from "$lib/components/Sidebar.svelte"
    import { ArrowDown, ArrowUp, LayoutDashboard, Package, Settings } from "lucide-svelte"
    import Footer from "$lib/components/Footer.svelte"

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })

    initializeStores()

    export let data: LayoutData
    const { user } = data || {}
</script>

<Toast />
<Modal />

<AppShell>
    <svelte:fragment slot="header">
        <title>Smart Stock It{` - ${$page.url.pathname}`}</title>
        <Header session={data?.session || false} user={data?.user} />
    </svelte:fragment>
    {#if user}
        <Breadcrumbs />
    {/if}
    <svelte:fragment slot="sidebarLeft">
        {#if user}
            <Sidebar
                navItems={[
                    { label: "Configurações", link: "/settings", Icon: Settings },
                    { label: "Dashboard", link: "/dashboard", Icon: LayoutDashboard },
                    { label: "Produtos", link: "/products", Icon: Package },
                    { label: "Entradas", link: "/input", Icon: ArrowUp },
                    { label: "Saídas", link: "/output", Icon: ArrowDown },
                ]} />
        {/if}
    </svelte:fragment>

    <div class="px-4 lg:px-28 h-full">
        <slot />
    </div>
    <svelte:fragment slot="pageFooter">
        <Footer customClass="pb-4" />
    </svelte:fragment>
</AppShell>
