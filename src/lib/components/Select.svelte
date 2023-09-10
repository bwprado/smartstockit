<script lang="ts">
    import { twMerge } from "tailwind-merge"
    import { cx } from "class-variance-authority"

    export let label: string = "Label"
    export let customClasses: {
        wrapper?: string
        label?: string
        select?: string
    } = {}
    export let type: string = "text"
    export let name: string = "input"
    export let id: string = "input"
    export let value: string = ""
    export let options: { name: string; id: string }[] = []
    const selectStyle = cx([
        "block",
        "w-full",
        "rounded-md",
        "py-1.5",
        "px-2",
        "h-10",
        "text-surface-900",
        "dark:bg-surface-700/50",
        "dark:text-surface-100",
        "bg-gray-50/50",
        "dark:placeholder:text-surface-400",
        "placeholder:text-surface-200",
        "ring-1",
        "ring-inset",
        "ring-surface-100",
        "dark:ring-1",
        "dark:ring-inset",
        "dark:ring-surface-500",
        "focus:ring-2",
        "focus:ring-inset",
        "focus:ring-primary-500",
        "dark:focus:ring-2",
        "dark:focus:ring-inset",
        "dark:focus:ring-primary-500",
        "sm:text-sm",
        "sm:leading-6",
        "outline-none",
        "[appearance:textfield]",
        "[&::-webkit-outer-spin-button]:appearance-none",
        "[&::-webkit-inner-spin-button]:appearance-none",
    ])
</script>

<div class={twMerge("w-full flex flex-col gap-y-2", customClasses.wrapper)}>
    <label
        for={name}
        class={twMerge(
            "block text-sm font-bold leading-6 text-gray-900 dark:text-gray-200",
            customClasses.label,
        )}>{label}</label>
    <select {type} {name} {id} class={twMerge(selectStyle, customClasses.select)} on:change {value}>
        <option value="" disabled selected> Selecione uma opção</option>
        {#each options as option}
            <option value={option.id}>{option.name}</option>
        {/each}
    </select>
</div>
