<script lang="ts">
    import { cva } from "class-variance-authority"
    import { twMerge } from "tailwind-merge"

    export let label: string = ""
    export let customClasses: {
        wrapper?: string
        label?: string
        input?: string
    } = {}
    export let name: string = "input"
    export let id: string = "input"
    export let required: boolean = false
    export let value: any = ""
    export let disabled: boolean = false
    export let placeholder: string = ""
    export let message: string = ""
    export let symbol: { text: string; position: "left" | "right" } = {
        text: "",
        position: "right",
    }

    const inputStyle = cva(
        [
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
        ],
        {
            variants: {
                symbolPosition: {
                    left: "rounded-s-none",
                    right: "rounded-e-none",
                    false: "",
                },
            },
        },
    )

    const symbolStyle = cva(
        ["bg-surface-600", "h-10", "text-xs", "text-surface-300", "flex", "items-center", "p-2"],
        {
            variants: {
                position: {
                    left: "rounded-l-md",
                    right: "rounded-r-md",
                },
            },
        },
    )

    const phoneMask = (value: string) => {
        if (!value) return ""
        value = value.replace(/\D/g, "")
        value = value.replace(/(\d{2})(\d)/, "($1) $2")
        value = value.replace(/(\d)(\d{4})$/, "$1-$2")
        return value
    }
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
    <div class="flex gap-x-4 items-center justify-between">
        <div class="flex items-center h-full w-full">
            {#if symbol.position === "left" && symbol.text}
                <div class={symbolStyle({ position: symbol.position })}>
                    {symbol.text}
                </div>
            {/if}
            <input
                {disabled}
                {required}
                type="text"
                {name}
                {id}
                {placeholder}
                bind:value
                aria-placeholder={placeholder}
                class={twMerge(
                    inputStyle({ symbolPosition: symbol.text ? symbol.position : false }),
                    customClasses.input,
                )}
                on:keydown
                on:keypress />
            {#if symbol.text && symbol.position === "right"}
                <div class={symbolStyle({ position: symbol.position })}>
                    {symbol.text}
                </div>
            {/if}
        </div>
        <slot name="action" />
    </div>
    {#if required || message}
        <p class="text-xs text-surface-900 dark:text-surface-300">
            {required ? (message ? `* ${message}` : "* obrigatório") : message}
        </p>
    {/if}
</div>
