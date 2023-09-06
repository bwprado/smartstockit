<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import SelectSearch from "$lib/components/SelectSearch.svelte"
    import Table from "$lib/components/Table/Table.svelte"
    import type { ActionData, PageData } from "./$types"
    import { getToastStore } from "@skeletonlabs/skeleton"

    const toast = getToastStore()

    interface Dashboard {
        product_id: string
        product_name: string
        average_price: number
        total_amount: number
    }

    export let data: PageData
    export let form: ActionData

    const products = data?.products || []
    const outputs = data?.outputs || []

    $: showModal = false
    $: loading = false

    const searchableProducts = products.map((product) => ({
        value: product.id,
        label: product.name,
        keywords: product.name.split(" ").join(", ").toLocaleLowerCase(),
    }))

    if (form?.status) {
        toast.trigger({
            message: form.body,
        })
    }
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
                key: "productName",
                type: "string",
            },
            {
                label: "Quantidade",
                key: "amount",
                type: "number",
            },
            {
                label: "Preço",
                key: "price",
                type: "currency",
            },
            {
                label: "Data de Saída",
                key: "created_at",
                type: "date",
            },
        ]}
        data={outputs}
    />
</section>

<Modal bind:showModal headerText="Retirar Produto" confirmFunction={() => console.log("Remove")}>
    <form slot="body" method="POST" class="flex flex-col gap-y-4 h-full">
        <SelectSearch name="product" id="product" label="Produto" options={searchableProducts} />
        <Input label="Quantidade" id="amount" name="amount" type="number" />
        <input type="hidden" name="price" value={0} />
        <Button
            type="submit"
            id="retrieve_product"
            className="w-full mt-auto"
            on:click={() => (loading = true)}
            {loading}>Retirar do Estoque</Button
        >
    </form>
    <svelte:fragment slot="footer">
        <div />
    </svelte:fragment>
</Modal>
