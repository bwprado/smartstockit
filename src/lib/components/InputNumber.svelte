<script lang="ts">
    import { twMerge } from "tailwind-merge"
    import { cx } from "class-variance-authority"
    import Checkbox from "./Checkbox.svelte"
    import { Minus, Plus } from "lucide-svelte"

    export let label: string = ""
    export let customClasses: {
        wrapper?: string
        label?: string
        input?: string
    } = {}
    export let name: string = "input"
    export let id: string = "input"
    export let required: boolean = false
    export let value: string = ""
    export let disabled: boolean = false

    let _value = 0

    $: value = _value.toString()

    const inputStyle = cx([
        "block",
        "w-full",
        "rounded-s-md",
        "border-0",
        "py-1.5",
        "px-2",
        "h-10",
        "text-gray-900",
        "ring-1",
        "ring-inset",
        "ring-gray-300",
        "placeholder:text-gray-400",
        "focus:ring-2",
        "focus:ring-inset",
        "focus:ring-indigo-600",
        "sm:text-sm",
        "sm:leading-6",
        "outline-none",
        "[appearance:textfield]",
        "[&::-webkit-outer-spin-button]:appearance-none",
        "[&::-webkit-inner-spin-button]:appearance-none",
    ])
</script>

<div class={twMerge("w-full flex flex-col gap-y-2", customClasses.wrapper)}>
    {#if label}
        <label
            for={name}
            class={twMerge(
                "block text-sm leading-6 text-gray-900 font-bold dark:text-gray-200",
                customClasses.label,
            )}>{label}</label>
    {/if}
    <div class="grid grid-cols-[2fr,1fr,1fr]">
        <input
            {disabled}
            {required}
            {name}
            {id}
            {value}
            type="number"
            class={twMerge(inputStyle, customClasses.input)} />
        <button
            type="button"
            class="bg-gray-50 text-surface-900 flex items-center justify-center border-r"
            on:click={() => _value--}>
            <Minus class="text-primary-500" />
        </button>
        <button
            type="button"
            class="bg-gray-50 text-surface-900 rounded-e-lg flex items-center justify-center"
            on:click={() => _value++}>
            <Plus class="text-primary-500" />
        </button>
    </div>
</div>
