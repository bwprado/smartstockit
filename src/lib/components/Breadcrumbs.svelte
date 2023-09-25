<script lang="ts">
    import { page } from "$app/stores"
    import lodash from "lodash"
    const { capitalize } = lodash

    $: myBreadcrumbs = $page.url.pathname
        .split("/")
        .filter((crumb) => crumb !== "")
        .map((crumb) => capitalize(crumb))
</script>

<div class="h-8 w-full flex items-center justify-start text-xs">
    <ul class="flex gap-x-4">
        {#each myBreadcrumbs as crumb, i}
            {#if i < myBreadcrumbs.length - 1}
                <li class="crumb"><a class="anchor" href={$page.url.pathname}>{crumb}</a></li>
                <li class="crumb-separator" aria-hidden>&rsaquo;</li>
            {:else}
                <li class="crumb"><a href="/dashboard">Home</a></li>
                <li class="crumb-separator" aria-hidden>&rsaquo;</li>
                <li class="crumb font-bold">{crumb}</li>
            {/if}
        {/each}
    </ul>
</div>
