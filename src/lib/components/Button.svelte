<script lang="ts">
    import { cva } from "class-variance-authority"

    export let type: import("svelte/elements").HTMLButtonAttributes["type"] = "button"
    export let id: string = ""
    export let href: HTMLAnchorElement["href"] = ""
    export let intent: "primary" | "secondary" | "danger" = "primary"

    const btnStyle = cva(
        ["rounded-lg", "font-bold", "p-3", "text-sm", "flex", "items-center", "justify-center"],
        {
            variants: {
                intent: {
                    primary: ["bg-primary-500", "text-primary-50", "hover:bg-primary-700"],
                    secondary: ["bg-transparent", "text-primary-50", "hover:bg-primary-500"],
                    danger: ["bg-red-500", "text-gray-100", "hover:bg-red-700"],
                },
            },
        },
    )
</script>

{#if href}
    <a {href}>
        <button {type} {id} class={btnStyle({ intent })}>
            <slot />
        </button>
    </a>
{:else}
    <button on:click type="submit" class={btnStyle({ intent })}>
        <slot />
    </button>
{/if}
