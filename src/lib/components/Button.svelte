<script lang="ts">
    export let type: import("svelte/elements").HTMLButtonAttributes["type"] = "button"
    export let id: string = ""
    export let href: HTMLAnchorElement["href"] = ""
</script>

{#if href}
    <a {href}>
        <button
            {type}
            {id}
            class="rounded-lg bg-primary-500 text-gray-100 font-bold p-3 text-sm flex items-center justify-center hover:bg-primary-700"
        >
            <slot />
        </button>
    </a>
{:else}
    <button
        on:click
        type="submit"
        class="rounded-lg bg-primary-500 text-gray-100 font-bold p-3 flex text-sm items-center justify-center hover:bg-primary-700"
    >
        <slot />
    </button>
{/if}
