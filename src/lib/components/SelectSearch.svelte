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

    const onSearchSelection = (event: CustomEvent<AutocompleteOption>): void => {
        inputLabel = event.detail.label as string
        inputValue = event.detail.value as string
    }
</script>

<div>
    <label for={name}>
        <p class="font-bold dark:text-gray-200 text-sm leading-6 text-gray-900">{label}</p>
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
        <div
            class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto rounded-xl"
            tabindex="-1"
            data-popup="popupAutocomplete">
            <Autocomplete
                bind:input={inputLabel}
                {options}
                on:selection={onSearchSelection}
                class="text-gray-900 dark:text-gray-200" />
        </div>
    </label>
</div>
