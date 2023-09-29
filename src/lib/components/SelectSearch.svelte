<script lang="ts">
    import {
        Autocomplete,
        popup,
        type AutocompleteOption,
        type PopupSettings,
    } from "@skeletonlabs/skeleton"
    import { cx } from "class-variance-authority"
    import { createEventDispatcher } from "svelte"
    import { twMerge } from "tailwind-merge"

    export let selected: any = {}
    export let inputValue: string = ""
    export let name: string = ""
    export let label: string = ""
    export let options: AutocompleteOption[] = []
    export let id: string = ""
    export let placeholder: string = ""
    export let disabled: boolean = false
    export let message: string = ""
    export let required: boolean = false

    export let customClasses: {
        wrapper?: string
        label?: string
        input?: string
    } = {}

    let popupSettings: PopupSettings = {
        event: "focus-click",
        target: `popupAutocomplete-${name}`,
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

    const dispatch = createEventDispatcher()

    const onSearchSelection = (event: CustomEvent<AutocompleteOption>): void => {
        selected = event.detail
        dispatch("selection", selected)
    }

    const handleOnChange = (event: Event): void => {
        if ((event.target as HTMLInputElement).value === "") {
            dispatch("change", {})
        }
    }
</script>

<div class="grid grid-flow-row w-full">
    <label for={name} class={twMerge("pb-2", customClasses.label)}>
        <p class="font-bold dark:text-gray-200 text-sm leading-6 text-gray-900">{label}</p>
    </label>
    <div class="flex flex-col gap-y-1 items-start justify-center w-full">
        <div class="flex gap-x-4 items-center justify-between w-full">
            <input
                type="search"
                {id}
                {name}
                {placeholder}
                {disabled}
                {required}
                on:input
                on:change={handleOnChange}
                bind:value={inputValue}
                aria-placeholder={placeholder}
                use:popup={popupSettings}
                class={twMerge(inputStyle, customClasses.input)} />
            <slot name="action" />
        </div>
        <input type="hidden" {name} {id} bind:value={selected.value} />
        {#if required || message}
            <p class="text-[10px] text-surface-900 dark:text-surface-400">
                {required ? (message ? `* ${message}` : "* obrigatório") : message}
            </p>
        {/if}
    </div>
    <div
        class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto rounded-lg dark:bg-surface-700 bg-white shadow-md z-10"
        tabindex="-1"
        data-popup={`popupAutocomplete-${name}`}>
        <Autocomplete
            {options}
            bind:input={inputValue}
            on:selection={onSearchSelection}
            regionNav="w-full"
            class="text-gray-900 dark:text-gray-200"
            emptyState="Nenhum resutado encontrado." />
    </div>
    <slot name="error" />
</div>
