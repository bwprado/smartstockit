<script>
    import { Toast, initializeStores } from "@skeletonlabs/skeleton"
    import "../../app.css"

    initializeStores()
</script>

<Toast />

<div class="h-auto w-auto">
    <slot />
</div>

<style>
    :root {
        --theme-font-family-base: "Roboto", sans-serif;
        --theme-font-family-heading: "Roboto", sans-serif;
    }
</style>
