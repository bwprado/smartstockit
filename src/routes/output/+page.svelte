<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import Table from "$lib/components/Table/Table.svelte"
    import type { PageData } from "./$types"
    interface Dashboard {
        product_id: string
        product_name: string
        average_price: number
        total_amount: number
    }

    export let data: PageData
    const products = data?.products || []
    const outputs = data?.outputs || []
    const dashboard: Dashboard[] = data?.dashboard || []
    let selectedProduct = "" as string
    const averagePrice =
        dashboard.length > 0 &&
        dashboard?.find((item) => item?.product_id === selectedProduct)?.average_price

    $: showModal = false

    console.log(outputs)
</script>

<div class="flex flex-col w-full py-6">
    <section class="flex justify-between">
        <h1 class="text-2xl font-bold">Lista de Saídas</h1>
        <Button on:click={() => (showModal = true)}>Retirar Produto</Button>
    </section>
</div>
<section class="table-container">
    <Table
        columns={[
            {
                label: "Produto",
                sort: "productName",
                type: "string",
            },
            {
                label: "Quantidade",
                sort: "amount",
                type: "number",
            },
            {
                label: "Preço",
                sort: "price",
                type: "currency",
            },
            {
                label: "Data",
                sort: "created_at",
                type: "date",
            },
        ]}
        data={outputs}
    />
</section>

<Modal bind:showModal headerText="Retirar Produto" confirmFunction={() => console.log("Remove")}>
    <form slot="body" method="post" class="flex flex-col gap-y-4">
        <div class="flex flex-col gap-y-1">
            <Input name="amount" id="amount" type="number" label="Código de barras" />
            <label for="product">Produto</label>
            <select
                name="product"
                id="product"
                class=""
                bind:value={selectedProduct}
                on:change={() => console.log(selectedProduct)}
            >
                {#each products as product}
                    <option value={product.id}>{product.name}</option>
                {/each}
            </select>
        </div>
        <div class="flex flex-col gap-y-1">
            <label for="amount">Quantidade</label>
            <input
                name="amount"
                id="amount"
                type="number"
                class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
        </div>
        <input type="hidden" name="price" value={averagePrice} />
        <button type="submit" class="p-4 bg-red-500 rounded-lg text-gray-100 hover:opacity-50"
            >Retirar do Estoque</button
        >
    </form>
</Modal>
