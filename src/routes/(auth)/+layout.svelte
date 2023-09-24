<script>
    import { Toast, initializeStores } from "@skeletonlabs/skeleton"
    import { page } from "$app/stores"
    import "../../app.css"
    import Footer from "$lib/components/Footer.svelte"

    initializeStores()
</script>

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
