<script lang="ts">
    import { ProgressRadial } from "@skeletonlabs/skeleton"
    import { cva } from "class-variance-authority"
    import { twMerge } from "tailwind-merge"

    export let type: import("svelte/elements").HTMLButtonAttributes["type"] = "button"
    export let id: string = ""
    export let href: HTMLAnchorElement["href"] = ""
    export let intent: "primary" | "secondary" | "terciary" | "danger" = "primary"
    export let loading: boolean = false
    export let disabled: boolean = false
    let className: string = ""
    export { className as class }

    const btnStyle = cva(
        [
            "rounded-lg",
            "font-bold",
            "h-10",
            "sm:px-4",
            "py-2",
            "px-2",
            "outline-none",
            "text-sm",
            "focus:ring-1",
            "focus:ring-inset-2",
            "focus:ring-secondary-500",
            "focus:dark:ring-2",
            "focus:dark:ring-inset-2",
            "focus:dark:ring-secondary-500",
            "transition-colors",
            "duration-200",
            "ease-in-out",
            "flex",
            "items-center",
            "justify-center",
            "gap-x-2",
            "w-full",
            "disabled:bg-surface-200",
            "disabled:text-surface-400",
            "disabled:cursor-not-allowed",
            "disabled:dark:bg-surface-700/30",
            "disabled:dark:text-surface-600",
        ],
        {
            variants: {
                intent: {
                    primary: ["bg-primary-500", "text-primary-50", "hover:bg-primary-800"],
                    secondary: [
                        "bg-surface-700",
                        "border",
                        "border-surface-500",
                        "text-surface-200",
                        "hover:bg-primary-500",
                        "hover:text-white",
                        "hover:dark:text-primary-500",
                        "hover:dark:bg-surface-100",
                    ],
                    terciary: [
                        "dark:bg-surface-800",
                        "dark:text-white",
                        "dark:hover:bg-white",
                        "dark:hover:text-primary-500",
                    ],
                    danger: ["bg-red-500", "text-gray-100", "hover:bg-red-700"],
                },
            },
        },
    )
</script>

{#if href}
    <a {href} class={twMerge(btnStyle({ intent }), className)}>
        <button {disabled} on:click {type} {id}>
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
