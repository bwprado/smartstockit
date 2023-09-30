<script lang="ts">
    import Chart from "$lib/components/Chart.svelte"
    import PageHeader from "$lib/components/PageHeader.svelte"
    import type { PageServerData } from "./$types"

    export let data: PageServerData

    let groupedInput: { amount: number; price: number }[] = data.inventory.input.reduce(
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
    let groupedOutput: { amount: number; price: number }[] = data.inventory.output.reduce(
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

    const datasetInput = [
        {
            data: Object.values(groupedInput).map((item) => item?.amount),
            borderWidth: 2,
            borderRadius: 8,
            borderSkiped: false,
            backgroundColor: "rgb(212, 22, 60, 0.8)",
        },
    ]

    const datasetOutput = [
        {
            data: Object.values(groupedOutput).map((item) => item?.amount),
            borderWidth: 2,
            borderRadius: 8,
            borderSkiped: false,
            backgroundColor: "rgb(70, 133, 175)",
        },
    ]

    const datasetBalance = [
        {
            label: "Saldo de produtos",
            data: Object.values(groupedInput).map((item) => item?.amount),
            borderWidth: 2,
            borderRadius: 8,
            backgroundColor: "rgb(212, 22, 60, 0.8)",
        },
    ]
</script>

<div class="flex flex-col gap-y-10 w-full">
    <PageHeader title="Dashboard"></PageHeader>
    <!-- <Chart type="line" labels={Object.keys(groupedInput)} datasets={datasetBalance} /> -->
    <div class="flex gap-x-4 w-1/2">
        <div class="flex flex-col gap-y-4 items-center">
            <h1 class="text-2xl font-bold">Entrada</h1>
            <Chart type="bar" labels={Object.keys(groupedInput)} datasets={datasetInput} />
        </div>
        <div class="flex flex-col gap-y-4 items-center">
            <h1 class="text-2xl font-bold">Saída</h1>
            <Chart type="bar" labels={Object.keys(groupedOutput)} datasets={datasetOutput} />
        </div>
    </div>
</div>
