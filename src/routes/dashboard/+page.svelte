<script>
    import Table from "$lib/components/Table/Table.svelte"

    export let data
    const { dashboard } = data || {}
</script>

<div class="table-container">
    <Table
        columns={[
            { label: "Código", sort: "product_id" },
            { label: "Produto", sort: "product_name" },
            { label: "Quantidade", sort: "total_amount" },
            { label: "Preço Médio", sort: "average_price" },
        ]}
        data={dashboard}
    />
</div>
