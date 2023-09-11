<script lang="ts">
    import { cva, cx } from "class-variance-authority"
    import { twMerge } from "tailwind-merge"

    let customClasses: string = ""
    export { customClasses as class }
    export let id: string = "button"
    export let type: "button" | "submit" | "reset" = "button"
    export let disabled: boolean = false
    export let href: string = ""
    export let intent: "primary" | "secondary" = "primary"

    const btn = cva(
        [
            "rounded-full",
            "hover:opacity-80",
            "text-gray-900",
            "dark:bg-transparent",
            "bg-transparent",
            "dark:text-primary-500",
            "bg-gray-100",
            "dark:bg-primary-500",
            "hover:bg-surface-100",
            "dark:hover:bg-primary-600",
            "dark:hover:text-gray-200",
            "dark:disabled:bg-surface-800",
            "dark:disabled:text-surface-500",
            "h-9",
            "w-9",
            "aspect-square",
            "flex",
            "items-center",
            "justify-center",
        ],
        {
            variants: {
                intent: {
                    primary: [
                        "bg-primary-500",
                        "text-white",
                        "dark:bg-primary-600",
                        "dark:text-gray-200",
                        "hover:bg-primary-600",
                        "dark:hover:bg-primary-700",
                    ],
                    secondary: [
                        "bg-surface-100",
                        "dark:bg-surface-700",
                        "text-gray-900",
                        "dark:text-primary-500",
                        "dark:hover:text-white",
                    ],
                },
            },
        },
    )
</script>

{#if href}
    <a class={twMerge(btn({ intent }), customClasses)} {href} {id} {type} {disabled} on:click>
        <slot />
    </a>
{:else}
    <button class={twMerge(btn({ intent }), customClasses)} {id} {type} {disabled} on:click|preventDefault>
        <slot />
    </button>
{/if}
