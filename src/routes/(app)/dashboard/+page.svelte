<script lang="ts">
    import Chart from "$lib/components/Chart.svelte"
    import PageHeader from "$lib/components/PageHeader.svelte"
    import type { PageServerData } from "./$types"

    export let data: PageServerData

    $: groupedInput = data.inventory.input.reduce(
        (acc, item) => {
            if (acc[item.products.name]) {
                acc[item.products.name] = {
                    amount: acc[item.products.name].amount + item.amount,
                    price: Math.round(acc[item.products.name].price + item.price),
                }
            } else {
                acc[item.products.name] = {
                    amount: item.amount,
                    price: Math.round(item.price),
                }
            }
            return acc
        },
        {} as Record<string, typeof data.inventory>,
    )
    $: groupedOutput = data.inventory.output.reduce(
        (acc, item) => {
            if (acc[item.products.name]) {
                acc[item.products.name] = {
                    amount: acc[item.products.name].amount + item.amount,
                    price: Math.round(acc[item.products.name].price + item.price),
                }
            } else {
                acc[item.products.name] = {
                    amount: item.amount,
                    price: Math.round(item.price),
                }
            }
            return acc
        },
        {} as Record<string, typeof data.inventory>,
    )
</script>

<div class="flex flex-col gap-y-10 w-full">
    <PageHeader title="Dashboard"></PageHeader>
    <!-- <Chart labels={Object.keys(groupedInput)} datasets={Object} /> -->
    {JSON.stringify(groupedInput)}
    {JSON.stringify(groupedOutput)}
</div>
