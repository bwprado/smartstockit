<script lang="ts">
    import { twMerge } from "tailwind-merge"

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
</script>

<div class={twMerge("w-full flex flex-col gap-y-2", customClasses.wrapper)}>
    <label for={name} class="flex items-center gap-x-2">
        <p
            class={twMerge(
                "font-bold dark:text-gray-200 text-sm leading-6 text-gray-900",
                customClasses.label,
            )}>
            {label}
        </p>
    </label>
    <input
        {type}
        {required}
        {name}
        {id}
        {value}
        {disabled}
        class={twMerge("checkbox", customClasses.input)}
        on:change />
</div>
