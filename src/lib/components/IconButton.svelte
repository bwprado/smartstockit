<script lang="ts">
    import { cx } from "class-variance-authority"
    import { twMerge } from "tailwind-merge"

    export let id: string = "button"
    export let type: "button" | "submit" | "reset" = "button"
    export let customClasses: string = ""
    export let disabled: boolean = false
    export let href: string = ""

    const btn = cx([
        "rounded-full",
        "hover:opacity-80",
        "text-gray-900",
        "dark:bg-transparent",
        "bg-transparent",
        "dark:text-primary-500",
        "h-9",
        "w-9",
        "flex",
        "items-center",
        "justify-center",
    ])
</script>

{#if href}
    <a class={twMerge(btn, customClasses)} {href} {id} {type} {disabled} on:click>
        <slot />
    </a>
{:else}
    <button class={twMerge(btn, customClasses)} {id} {type} {disabled} on:click>
        <slot />
    </button>
{/if}
