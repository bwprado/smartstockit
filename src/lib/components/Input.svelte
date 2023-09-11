<script lang="ts">
    import { twMerge } from "tailwind-merge"
    import { cx } from "class-variance-authority"
    import Checkbox from "./Checkbox.svelte"
    import InputNumber from "./InputNumber.svelte"

    export let label: string = ""
    export let customClasses: {
        wrapper?: string
        label?: string
        input?: string
    } = {}
    export let type: HTMLInputElement["type"] = "text"
    export let name: string = "input"
    export let id: string = "input"
    export let required: boolean = false
    export let value: string = ""
    export let disabled: boolean = false
    export let placeholder: string = ""
    export let selected: boolean = false
    export let message: string = ""

    const inputStyle = cx([
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
        "focus:outline-none",
        "ring-1",
        "ring-inset",
        "ring-surface-100",
        "dark:ring-1",
        "dark:ring-inset",
        "dark:ring-surface-500",
        "focus:ring-2",
        "focus:ring-inset",
        "focus:ring-primary-600",
        "dark:focus:ring-2",
        "dark:focus:ring-inset",
        "dark:focus:ring-primary-600",
        "sm:text-sm",
        "sm:leading-6",
        "outline-none",
        "[appearance:textfield]",
        "[&::-webkit-outer-spin-button]:appearance-none",
        "[&::-webkit-inner-spin-button]:appearance-none",
    ])
</script>

{#if type === "checkbox"}
    <Checkbox {selected} {disabled} {required} {name} {id} {value} {label} {message} />
{:else if type === "btn-number"}
    <InputNumber {disabled} {required} {name} {id} bind:value {label} />
{:else}
    <div class={twMerge("w-full flex flex-col gap-y-2", customClasses.wrapper)}>
        {#if label}
            <label
                for={name}
                class={twMerge(
                    "block text-sm leading-6 text-gray-900 font-bold dark:text-gray-200",
                    customClasses.label,
                )}>{label}</label>
        {/if}
        <input
            {disabled}
            {required}
            type="text"
            pattern={type === "number" ? "[0-9]*" : ""}
            {name}
            {id}
            {value}
            {placeholder}
            aria-placeholder={placeholder}
            class={twMerge(inputStyle, customClasses.input)}
            on:keydown
            on:keypress
            on:input />
    </div>
{/if}
