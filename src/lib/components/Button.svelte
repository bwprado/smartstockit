<script lang="ts">
    import { ProgressRadial } from "@skeletonlabs/skeleton"
    import { cva } from "class-variance-authority"
    import { twMerge } from "tailwind-merge"

    export let type: import("svelte/elements").HTMLButtonAttributes["type"] = "button"
    export let id: string = ""
    export let href: HTMLAnchorElement["href"] = ""
    export let intent: "primary" | "secondary" | "danger" = "primary"
    export let loading: boolean = false
    export let disabled: boolean = false
    let className: string = ""
    export { className as class }

    const btnStyle = cva(
        [
            "rounded-lg",
            "h-10",
            "font-bold",
            "py-2",
            "px-4",
            "text-sm",
            "flex",
            "items-center",
            "justify-center",
            "gap-x-4",
            "w-full",
        ],
        {
            variants: {
                intent: {
                    primary: ["bg-primary-500", "text-primary-50", "hover:bg-primary-700"],
                    secondary: ["bg-surface-700", "text-surface-100", "hover:bg-primary-500"],
                    danger: ["bg-red-500", "text-gray-100", "hover:bg-red-700"],
                },
            },
        },
    )
</script>

{#if href}
    <a {href}>
        <button {disabled} on:click {type} {id} class={twMerge(btnStyle({ intent }), className)}>
            {#if loading}
                <ProgressRadial width="w-5" fill="text-white" stroke={100} />
            {/if}
            <slot />
        </button>
    </a>
{:else}
    <button {disabled} {type} {id} on:click class={twMerge(btnStyle({ intent }), className)}>
        {#if loading}
            <ProgressRadial width="w-5" fill="text-white" stroke={100} />
        {/if}
        <slot />
    </button>
{/if}
