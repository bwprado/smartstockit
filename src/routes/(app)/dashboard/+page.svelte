<script lang="ts">
    import Box from "$lib/components/Box.svelte"
    import Chart from "$lib/components/Chart.svelte"
    import EmptyWrapper from "$lib/components/EmptyWrapper.svelte"
    import PageHeader from "$lib/components/PageHeader.svelte"
    import Table from "$lib/components/Table/Table.svelte"
    
    import { page } from "$app/stores"
    import { twMerge } from "tailwind-merge"
    import type { PageServerData } from "./$types"

    export let data: PageServerData

    let calc = [...data.inventory.input, ...data.inventory.output].reduce(
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
    $: balance = Object.keys(calc).map((k) => ({
        name: k,
        amount: calc[k].amount,
        avgPrice: calc[k].price,
    }))

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
            borderColor: "rgb(70, 133, 175, 0.8)",
            backgroundColor: "rgb(70, 133, 175, 0.4)",
        },
    ]

    const datasetOutput = [
        {
            data: Object.values(groupedOutput).map((item) => item?.amount),
            borderWidth: 2,
            borderRadius: 8,
            borderSkiped: false,
            borderColor: "rgb(212, 22, 60, 0.8)",
            backgroundColor: "rgb(212, 22, 60, 0.4)",
        },
    ]

    const datasetBalance = [
        {
            label: "Saldo de produtos",
            data: Object.values(groupedInput).map((item) => item?.amount),
            borderWidth: 2,
            borderRadius: 8,
            borderSkiped: false,
            borderColor: "rgb(212, 22, 60, 0.8)",
            backgroundColor: "rgb(212, 22, 60, 0.4)",
        },
    ]

    const handleRowClick = (row: any) => {
        console.log(row)
    }

</script>
<svelte:head>
    <title>SmartStockIt | Dashboard</title>
</svelte:head>

<div class="flex w-full flex-col gap-y-10">
    <PageHeader title="Dashboard">
        <p slot="message" class="text-xs text-surface-600 dark:text-surface-300">
            Aqui você pode conferir algumas informações sobre seu estoque. Gráficos de maiores
            entradas e saídas e o resumo do estoque.
        </p>
    </PageHeader>

    <!-- <Chart type="line" labels={Object.keys(groupedInput)} datasets={datasetBalance} /> -->
    <div class="flex flex-col gap-10 sm:flex-row">
        <Box title="Entrada">
            <Chart type="bar" labels={Object.keys(groupedInput)} datasets={datasetInput} />
        </Box>
        <Box title="Saída">
            <Chart type="bar" labels={Object.keys(groupedOutput)} datasets={datasetOutput} />
        </Box>
    </div>
    <h1 class="text-xl font-bold">Inventário</h1>
    <EmptyWrapper
        message="Lista de estoque vazia, adicione um produto para começar e faça uma entrada para começar."
        title="Você ainda não tem estoque."
        length={balance.length}>
        <section class={twMerge("table-container", "rounded-lg")} slot="content">
            <Table
                columns={[
                    { label: "Produto", key: "name", type: "string" },
                    { label: "Quantidade", key: "amount", type: "number" },
                    { label: "Preço Médio", key: "avgPrice", type: "currency" },
                ]}
                data={balance}
                index={0}
                {handleRowClick} />
        </section>
    </EmptyWrapper>
</div>
