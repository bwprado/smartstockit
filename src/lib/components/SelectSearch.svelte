<script lang="ts">
    import {
        Autocomplete,
        popup,
        type AutocompleteOption,
        type PopupSettings,
    } from "@skeletonlabs/skeleton"
    import { cx } from "class-variance-authority"

    let inputValue: string = ""
    let inputLabel: string = ""
    export let name: string = ""
    export let label: string = ""
    export let options: AutocompleteOption[] = []
    export let id: string = ""
    export let placeholder: string = ""

    let popupSettings: PopupSettings = {
        event: "focus-click",
        target: "popupAutocomplete",
        placement: "bottom",
    }

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
        "dark:ring-1",
        "dark:ring-inset",
        "ring-surface-100",
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

    const onSearchSelection = (event: CustomEvent<AutocompleteOption>): void => {
        inputLabel = event.detail.label as string
        inputValue = event.detail.value as string
    }
</script>

<div class="grid grid-flow-row">
    <label for={name} class="pb-2">
        <p class="font-bold dark:text-gray-200 text-sm leading-6 text-gray-900">{label}</p>
    </label>
    <form action="?/addCategory" class="flex gap-x-4 items-center justify-center">
        <input
            type="search"
            id={label}
            {name}
            {placeholder}
            on:change
            bind:value={inputLabel}
            aria-placeholder={placeholder}
            use:popup={popupSettings}
            class={inputStyle} />
        <input type="hidden" {name} {id} bind:value={inputValue} />
        <slot name="action" />
    </form>
    <div
        class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto rounded-xl dark:bg-surface-700 bg-white shadow-md"
        tabindex="-1"
        data-popup="popupAutocomplete">
        <Autocomplete
            bind:input={inputLabel}
            {options}
            on:selection={onSearchSelection}
            class="text-gray-900 dark:text-gray-200"
            emptyState="Nenhum resutado encontrado." />
    </div>
    <slot name="error" />
</div>
