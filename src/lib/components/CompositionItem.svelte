<script lang="ts">
    import { Minus } from "lucide-svelte"
    import IconButton from "./IconButton.svelte"
    import Input from "./Input.svelte"
    import SelectSearch from "./SelectSearch.svelte"
    import type { Autocomplete, AutocompleteOption } from "@skeletonlabs/skeleton"
    import { createEventDispatcher } from "svelte"

    export let key: string = ""
    export let compItem: { value: string; label: string; amount: number } = {
        value: "",
        label: "",
        amount: 0,
    }
    export let options: { value: string; label: string }[] = []

    const handleInput = (e: Event) => {
        const input = e?.currentTarget as HTMLInputElement
        compItem.amount = +input.value
    }

    const dispatch = createEventDispatcher()
    const handleSelection = (e: CustomEvent<AutocompleteOption>) => {
        compItem.value = e.detail.value as string
        compItem.label = e.detail.label
        dispatch("selection", e.detail)
    }
</script>

<tr class="relative" id={key}>
    <td class="first:w-4/5">
        <SelectSearch
            {options}
            name={compItem.label}
            id={compItem.value}
            bind:inputValue={compItem.label}
            on:selection={handleSelection}
            placeholder="Digite o nome do insumo"
            customClasses={{
                wrapper: "w-full",
                input: "w-full rounded-s-md rounded-e-none",
                label: "pb-0",
            }} />
    </td>
    <td>
        <Input
            placeholder="0"
            type="number"
            name={`${compItem.value}-amount`}
            id={`${compItem.value}-amount`}
            customClasses={{
                wrapper: "w-full",
                input: "w-full rounded-e-md rounded-s-none",
            }}
            on:input={handleInput} />
    </td>
    <td class="pl-2 right-0">
        <IconButton intent="secondary" on:click><Minus size={15} /></IconButton>
    </td>
</tr>
