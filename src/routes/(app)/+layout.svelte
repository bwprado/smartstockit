<script lang="ts">
    import { page } from "$app/stores"
    import { arrow, autoUpdate, computePosition, flip, offset, shift } from "@floating-ui/dom"
    import { AppShell, Modal, Toast, initializeStores, storePopup } from "@skeletonlabs/skeleton"
    import "../../app.css"
    import type { LayoutData } from "./$types"

    import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
    import Footer from "$lib/components/Footer.svelte"
    import Header from "$lib/components/Header.svelte"
    import Sidebar from "$lib/components/Sidebar.svelte"
    import SidebarItem from "$lib/components/SidebarItem.svelte"
    import { ArrowDown, ArrowUp, Box, LayoutDashboard, Settings, Settings2 } from "lucide-svelte"

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })

    initializeStores()

    export let data: LayoutData

    const { session, profile } = data
</script>

<Toast />
<Modal />

<AppShell>
    <svelte:fragment slot="header">
        <title>Smart Stock It{` - ${$page.url.pathname}`}</title>
        {#if profile && session}
            <Header {session} {profile} />
        {/if}
    </svelte:fragment>
    <svelte:fragment slot="sidebarLeft">
        {#if profile}
            <Sidebar>
                <SidebarItem label="Configurações" link="/settings">
                    <Settings size={20} />
                </SidebarItem>
                <SidebarItem label="Dashboard" link="/dashboard">
                    <LayoutDashboard size={20} />
                </SidebarItem>
                <SidebarItem label="Produtos" link="/products">
                    <Box size={20} />
                </SidebarItem>
                <SidebarItem label="Entradas" link="/input">
                    <ArrowUp size={20} />
                </SidebarItem>
                <SidebarItem label="Saídas" link="/output">
                    <ArrowDown size={20} />
                </SidebarItem>
            </Sidebar>
        {/if}
    </svelte:fragment>

    <div class="px-4 lg:px-8 xl:px-20 h-full flex flex-col gap-y-10">
        <Breadcrumbs />
        <slot />
    </div>
    <svelte:fragment slot="pageFooter">
        <Footer class="pb-4" />
    </svelte:fragment>
</AppShell>
