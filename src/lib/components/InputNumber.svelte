<script lang="ts">
    import { cva, cx } from "class-variance-authority"
    import { Minus, Plus } from "lucide-svelte"
    import { twMerge } from "tailwind-merge"

    export let label: string = ""
    export let customClasses: {
        wrapper?: string
        label?: string
        input?: string
    } = {}
    export let name: string = "input"
    export let step: string = "0.01"
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
    const buttonStyle = cva(
        [
            "bg-gray-50",
            "dark:bg-surface-700",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-inset",
            "focus:ring-primary-600",
            "dark:focus:ring-2",
            "dark:focus:ring-inset",
            "dark:focus:ring-primary-600",
            "text-surface-900",
            "flex",
            "items-center",
            "justify-center",
            "border-r",
            "dark:border-surface-500",
            "dark:ring-surface-500",
        ],
        {
            variants: {
                type: {
                    minus: ["rounded-none"],
                    plus: ["rounded-e-md"],
                },
            },
        },
    )
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
            {step}
            {disabled}
            {required}
            {name}
            {id}
            bind:value
            type="number"
            inputmode="numeric"
            class={twMerge(inputStyle, customClasses.input)} />
        <button type="button" class={buttonStyle({ type: "minus" })} on:click={() => _value--}>
            <Minus class="text-primary-500" />
        </button>
        <button type="button" class={buttonStyle({ type: "plus" })} on:click={() => _value++}>
            <Plus class="text-primary-500" />
        </button>
    </div>
</div>
