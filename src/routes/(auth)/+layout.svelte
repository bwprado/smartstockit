<script lang="ts">
    import { page } from "$app/stores"
    import { Modal, Toast, initializeStores, type ModalComponent } from "@skeletonlabs/skeleton"

    import Footer from "$lib/components/Footer.svelte"
    import "../../app.css"
    import ModalLoading from "$lib/components/ModalLoading.svelte"

    initializeStores()

    const modalRegistry: Record<string, ModalComponent> = {
        modalComponentLoading: {
            ref: ModalLoading,
        },
    }
</script>

<Modal components={modalRegistry} />
<Toast />
<svelte:head>
    <title>Smart Stock It | {$page.url.pathname === "/login" ? "Login" : "Criar Conta"}</title>
</svelte:head>
<div class="flex h-screen w-auto items-center justify-center lg:h-[calc(100vh-44px)]">
    <slot />
</div>
<Footer />

<style>
    :root {
        --theme-font-family-base: "Roboto", sans-serif;
        --theme-font-family-heading: "Roboto", sans-serif;
    }
</style>
