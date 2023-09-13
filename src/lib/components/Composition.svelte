<script lang="ts">
    import { twMerge } from "tailwind-merge"
    import Button from "./Button.svelte"
    import CompositionItem from "./CompositionItem.svelte"
    import { isEqual } from "lodash"

    export let label: string = ""
    export let name: string = "input"
    export let customClasses: {
        wrapper?: string
        label?: string
        input?: string
    } = {}

    export let options: { value: string; label: string }[] = []
    export let composition: { value: string; label: string; amount: number }[] = []
    let selected: { value: string; label: string } = {
        value: "",
        label: "",
    }
</script>

<label
    for={name}
    class={twMerge(
        "block text-sm leading-6 text-gray-900 font-bold dark:text-gray-200",
        customClasses.label,
    )}>{label}</label>
<p class="text-xs text-surface-900 dark:text-surface-200">Nenhum insumo adicionado</p>
<table id="raw_material" class="rounded-t-md">
    <thead class="rounded-t-md">
        <tr class="text-xs text-surface-900 dark:text-surface-200 bg-surface-700 leading-6">
            <th class="px-3 rounded-s-md">Insumo</th>
            <th class="px-3 rounded-e-md">Quantidade</th>
        </tr>
    </thead>
    <tbody class="relative">
        {#each composition as item}
            {#key composition.length}
                <CompositionItem
                    on:selection={(e) => {
                        selected = e.detail
                    }}
                    bind:amount={item.amount}
                    bind:label={item.label}
                    bind:value={item.value}
                    {options}
                    key={item.value}
                    on:click={() => {
                        composition = composition.filter((c) => !isEqual(c, item))
                    }} />
            {/key}
        {/each}
    </tbody>
</table>
<Button
    intent="secondary"
    class="w-fit text-xs"
    on:click={() => (composition = [...composition, { value: "", label: "", amount: 0 }])}>
    Adicionar Insumo
</Button>
