<script lang="ts">
    import { page } from "$app/stores"
    import { Modal, Toast, initializeStores } from "@skeletonlabs/skeleton"
    
    import Footer from "$lib/components/Footer.svelte"
    import "../../app.css"

    initializeStores()
</script>

<Modal />
<Toast />
<svelte:head>
    <title>Smart Stock It - {$page.url.pathname === "/login" ? "Login" : "Criar Conta"}</title>
</svelte:head>
<div class="h-full lg:h-[calc(100vh-44px)] w-auto flex items-center justify-center">
    <slot />
</div>
<Footer />

<style>
    :root {
        --theme-font-family-base: "Roboto", sans-serif;
        --theme-font-family-heading: "Roboto", sans-serif;
    }
</style>
