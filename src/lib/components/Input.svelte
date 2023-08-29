<script lang="ts">
    import { twMerge } from "tailwind-merge"
    import { cx } from "class-variance-authority"

    export let label: string = "Label"
    export let customClasses: {
        wrapper?: string
        label?: string
        input?: string
    } = {}
    export let type: string = "text"
    export let name: string = "input"
    export let id: string = "input"
    export let onInput: (e: Event) => void = () => {}

    const inputStyle = cx([
        "block",
        "w-full",
        "rounded-md",
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

<div class={twMerge("w-full flex flex-col gap-y-1", customClasses.wrapper)}>
    <label
        for={name}
        class={twMerge(
            "block text-sm leading-6 text-gray-900 font-bold dark:text-gray-200",
            customClasses.label,
        )}>{label}</label>
    <input
        type={type}
        name={name}
        id={id}
        class={twMerge(inputStyle, customClasses.input)}
        on:input={onInput} />
</div>
