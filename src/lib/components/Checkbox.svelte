<script lang="ts">
    import { cx } from "class-variance-authority"
    import { twMerge } from "tailwind-merge"

    export let label: string = ""
    export let customClasses: {
        wrapper?: string
        label?: string
        input?: string
    } = {}
    export let type: HTMLInputElement["type"] = "checkbox"
    export let name: string = "input"
    export let id: string = "input"
    export let required: boolean = false
    export let value: string = ""
    export let disabled: boolean = false
    export let selected: boolean = false
    export let message: string = ""
    export let checked: boolean = false

    const inputStyle = cx([
        "w-5",
        "h-5",
        "!rounded-lg",
        "text-primary-500",
        "bg-gray-100",
        "border-gray-300",
        "focus:ring-primary-500",
        "outline-none",
        "dark:focus:ring-primary-600",
        "dark:ring-offset-gray-700",
        "dark:focus:ring-offset-gray-700",
        "focus:ring-2",
        "dark:bg-gray-600",
        "dark:border-gray-500",
        "dark:accent-primary-500",
        "accent-primary-500",
    ])
</script>

<div class="flex flex-col gap-y-1">
    <div class={twMerge("w-full flex gap-x-4 items-center", customClasses.wrapper)}>
        <input
            {selected}
            type="checkbox"
            {required}
            {name}
            {id}
            bind:value
            bind:checked
            {disabled}
            class={twMerge(inputStyle, customClasses.input)}
            on:change />
        <label for={name} class="flex items-center gap-x-2">
            <p
                class={twMerge(
                    "font-bold dark:text-gray-200 text-sm leading-6 text-gray-900",
                    customClasses.label,
                )}>
                {label}
            </p>
        </label>
    </div>
    <p class="text-xs text-surface-300 dark:text-surface-400">{message}</p>
</div>
