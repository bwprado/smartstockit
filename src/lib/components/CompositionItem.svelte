<script lang="ts">
    import type { AutocompleteOption } from "@skeletonlabs/skeleton"
    import { uniqueId } from "lodash"
    import { Minus } from "lucide-svelte"
    import { createEventDispatcher } from "svelte"
    import IconButton from "./IconButton.svelte"
    import Input from "./Input.svelte"
    import SelectSearch from "./SelectSearch.svelte"

    export let key: string = ""
    export let value: string = ""
    export let label: string = ""
    export let amount: number = 0
    export let options: { value: string; label: string }[] = []

    const handleInput = (e: Event) => {
        const input = e?.currentTarget as HTMLInputElement
        amount = +input.value
    }

    const dispatch = createEventDispatcher()
    const handleSelection = (e: CustomEvent<AutocompleteOption>) => {
        value = e.detail.value as string
        label = e.detail.label
        dispatch("selection", e.detail)
    }
    const idSearch = uniqueId()
    const idAmount = uniqueId()
</script>

<tr class="relative" id={key}>
    <td class="first:w-4/5">
        <SelectSearch
            {options}
            name={idSearch}
            id={idSearch}
            bind:inputValue={label}
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
            value={`${amount}`}
            name={idAmount}
            id={idAmount}
            customClasses={{
                wrapper: "w-full",
                input: "w-full rounded-e-md rounded-s-none",
            }}
            on:input={handleInput} />
    </td>
    <td class="pl-2 right-0">
        <IconButton intent="secondary" on:click
            ><svelte:fragment slot="icon">
                <Minus size={15} />
            </svelte:fragment></IconButton>
    </td>
</tr>
