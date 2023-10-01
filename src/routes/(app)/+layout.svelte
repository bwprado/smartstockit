<script lang="ts">
    import { page } from "$app/stores"
    import { arrow, autoUpdate, computePosition, flip, offset, shift } from "@floating-ui/dom"
    import { AppShell, Modal, Toast, initializeStores, storePopup } from "@skeletonlabs/skeleton"
    import "../../app.css"
    import type { LayoutData } from "./$types"

    import Breadcrumbs from "$lib/components/Breadcrumbs.svelte"
    import Footer from "$lib/components/Footer.svelte"
    import Header from "$lib/components/Header.svelte"
    import MenuItems from "$lib/components/MenuItems.svelte"
    import Sidebar from "$lib/components/Sidebar.svelte"

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
                <MenuItems />
            </Sidebar>
        {/if}
    </svelte:fragment>

    <div class="px-4 lg:px-8 xl:px-20 h-full flex flex-col gap-y-4">
        <Breadcrumbs />
        <slot />
    </div>
    <svelte:fragment slot="pageFooter">
        <Footer class="p-4" />
    </svelte:fragment>
</AppShell>
