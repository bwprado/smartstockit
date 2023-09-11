<script lang="ts">
    import { twMerge } from "tailwind-merge"
    import Button from "./Button.svelte"
    import CompositionItem from "./CompositionItem.svelte"

    export let label: string = ""
    export let name: string = "input"
    export let customClasses: {
        wrapper?: string
        label?: string
        input?: string
    } = {}
    export let options: { value: string; label: string }[] = []
    let composition: { value: string; label: string; amount: number }[] = []
</script>

{#if label}
    <label
        for={name}
        class={twMerge(
            "block text-sm leading-6 text-gray-900 font-bold dark:text-gray-200",
            customClasses.label,
        )}>{label}</label>
{/if}
{#if composition.length === 0}
    <p class="text-xs text-surface-900 dark:text-surface-200">Nenhum insumo adicionado</p>
{:else}
    <table id="raw_material" class="rounded-t-md">
        <thead class="rounded-t-md">
            <tr class="text-xs text-surface-900 dark:text-surface-200 bg-surface-700 leading-6">
                <th class="px-3 rounded-s-md">Insumo</th>
                <th class="px-3 rounded-e-md">Quantidade</th>
            </tr>
        </thead>
        <tbody class="relative">
            {#each composition as item}
                {#key item.value}
                    <CompositionItem
                        key={item.value}
                        {options}
                        bind:compItem={item}
                        on:click={() => {
                            composition = composition.filter((c) => c != item)
                        }} />
                {/key}
            {/each}
        </tbody>
    </table>
    <div class="text-white">{JSON.stringify(composition)}</div>
{/if}
<Button
    intent="secondary"
    class="w-fit text-xs"
    on:click={() => (composition = [...composition, { value: "", label: "", amount: 0 }])}>
    Adicionar Insumo
</Button>
