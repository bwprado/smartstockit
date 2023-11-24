<script lang="ts">
    import { page } from "$app/stores"
    import { arrow, autoUpdate, computePosition, flip, offset, shift } from "@floating-ui/dom"
    import {
        AppShell,
        Modal,
        Toast,
        initializeStores,
        storePopup,
        type ModalComponent,
    } from "@skeletonlabs/skeleton"
    import "../../app.css"
    import type { LayoutData } from "./$types"

    import ModalEditOutput from "$lib/components/CustomModals/ModalEditOutput.svelte"
    import Footer from "$lib/components/Footer.svelte"
    import Header from "$lib/components/Header.svelte"
    import MenuItems from "$lib/components/MenuItems.svelte"
    import ModalLoading from "$lib/components/ModalLoading.svelte"
    import Sidebar from "$lib/components/Sidebar.svelte"

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })

    initializeStores()

    export let data: LayoutData

    const { session, profile } = data

    const modalRegistry: Record<string, ModalComponent> = {
        modalComponentLoading: {
            ref: ModalLoading,
        },
        modalEditOutput: {
            ref: ModalEditOutput,
        },
    }
</script>

<Toast />
<Modal components={modalRegistry} />

<svelte:head>
    <title>{`SmartStockIt | Sistema avançado de gerenciamento de Estoque`}</title>
</svelte:head>
<AppShell>
    <svelte:fragment slot="header">
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

    <div class="flex h-full flex-col gap-y-2 px-4 py-6 lg:px-8 xl:px-20">
        <!-- <Breadcrumbs /> -->
        <slot />
    </div>
    <svelte:fragment slot="pageFooter">
        <Footer class="p-4" />
    </svelte:fragment>
</AppShell>
