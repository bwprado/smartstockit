<script lang="ts">
    import Button from "./Button.svelte"
    import IconButton from "./IconButton.svelte"
    import Input from "./Input.svelte"
    import SelectSearch from "./SelectSearch.svelte"

    import { isEqual } from "lodash"
    import { Minus } from "lucide-svelte"
    import { fade } from "svelte/transition"
    import { twMerge } from "tailwind-merge"

    export let label: string = ""
    export let name: string = "input"
    export let customClasses: {
        wrapper?: string
        label?: string
        input?: string
    } = {}

    export let options: { value: string; label: string; acronym?: string }[] = []
    export let composition: { value: string; label: string; amount: number; acronym?: string }[] =
        []
</script>

<div transition:fade={{ duration: 100 }} class="w-full flex flex-col gap-y-4">
    <label
        for={name}
        class={twMerge(
            "block text-sm leading-6 text-gray-900 font-bold dark:text-gray-200",
            customClasses.label,
        )}
        >{label}
    </label>
    {#if composition?.length > 0}
        <table id="raw_material" class="rounded-t-md w-full">
            <thead class="rounded-t-md">
                <tr class="text-xs text-surface-900 dark:text-surface-200 bg-surface-700 leading-6">
                    <th class="px-3 rounded-s-md">Insumo</th>
                    <th class="px-3 rounded-e-md">Quantidade</th>
                </tr>
            </thead>
            <tbody class="relative">
                {#each composition as item, index}
                    {#key composition.length}
                        <tr class="relative" id={item.value + index}>
                            <td class="first:w-3/5">
                                <SelectSearch
                                    {options}
                                    name={item.label + index}
                                    id={item.value + index}
                                    bind:inputValue={composition[index].label}
                                    on:selection={(e) => {
                                        composition[index].label = e.detail.label
                                        composition[index].value = e.detail.value
                                        composition[index].acronym = e.detail.acronym
                                    }}
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
                                    bind:value={composition[index].amount}
                                    name={item.label + "amount" + index}
                                    id={item.label + "amount" + index}
                                    customClasses={{
                                        wrapper: "w-full",
                                        input: "w-full rounded-none",
                                    }}
                                    symbol={item.acronym}>
                                </Input>
                            </td>
                            <td class="pl-2 right-0">
                                <IconButton
                                    intent="secondary"
                                    on:click={() => {
                                        composition = composition.filter((c) => !isEqual(c, item))
                                    }}
                                    ><svelte:fragment slot="icon">
                                        <Minus size={15} />
                                    </svelte:fragment></IconButton>
                            </td>
                        </tr>
                    {/key}
                {/each}
            </tbody>
        </table>
    {:else}
        <p class="text-xs text-surface-900 dark:text-surface-200">Nenhum insumo adicionado</p>
    {/if}
    <Button
        intent="secondary"
        class="w-fit text-xs"
        on:click={() => (composition = [...composition, { value: "", label: "", amount: 0 }])}>
        Adicionar Insumo
    </Button>
</div>
