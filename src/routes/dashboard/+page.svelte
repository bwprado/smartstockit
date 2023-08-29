<script>
    import Table from "$lib/components/Table/Table.svelte"

    export let data
    const { dashboard } = data || {}
</script>

<div class="flex flex-col gap-y-10 w-full">
    <section>
        <h1 class="text-2xl font-bold">Dashboard</h1>
    </section>

    <div class="table-container">
        <Table
            columns={[
                { label: "Código", sort: "product_id", type: "string" },
                { label: "Produto", sort: "product_name", type: "string" },
                { label: "Quantidade", sort: "total_amount", type: "number" },
                { label: "Preço Médio", sort: "average_price", type: "currency" },
                { label: "Última Compra", sort: "last_purchase", type: "date" },
            ]}
            data={dashboard}
            index={1}
        />
    </div>
</div>
