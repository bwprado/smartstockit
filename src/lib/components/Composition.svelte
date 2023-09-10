<script lang="ts">
    import { twMerge } from "tailwind-merge"

    export let label: string = ""
    export let name: string = "input"
    export let id: string = "input"
    export let customClasses: {
        wrapper?: string
        label?: string
        input?: string
    } = {}
</script>

{#if label}
    <label
        for={name}
        class={twMerge(
            "block text-sm leading-6 text-gray-900 font-bold dark:text-gray-200",
            customClasses.label,
        )}>{label}</label>
{/if}
