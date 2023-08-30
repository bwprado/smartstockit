<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import Select from "$lib/components/Select.svelte"
    import Table from "$lib/components/Table/Table.svelte"

    export let data
    $: showModal = false
    const products = (data?.products || []).map((product) => ({
        name: product.name,
        id: product.id,
    }))

    $: inputs = data?.inputs || []

    $: isFresh = false

    const handleChange = (event: Event) => {
        if (event?.target instanceof HTMLInputElement) {
            isFresh = event?.target?.checked
        }
    }
</script>

<div class="flex flex-col w-full py-6">
    <section class="flex justify-between">
        <h1 class="text-2xl font-bold">Lista de Entradas</h1>
        <Button on:click={() => (showModal = true)}>Adicionar Entrada</Button>
    </section>
</div>

<section class="table-container">
    <Table
        columns={[
            { label: "Produto", key: "productName", type: "string" },
            { label: "Quantidade", key: "amount", type: "number" },
            { label: "Preço", key: "price", type: "currency" },
            { label: "Data de Vencimento", key: "expiration_date", type: "date" },
            { label: "Produto Fresco", key: "fresh", type: "string" },
        ]}
        data={inputs}
    />
</section>

<Modal bind:showModal headerText="Entrada de Produtos" confirmFunction={() => console.log("Test")}>
    <svelte:fragment slot="body">
        <form method="post" class="flex flex-col gap-y-4">
            <Select name="product" id="product" options={products} label="Produto" />
            <Input name="amount" id="amount" type="number" label="Quantidade" />
            <Input name="price" id="price" type="number" label="Preço" />
            <Input
                type="checkbox"
                name="fresh"
                id="fresh"
                label="Produto Fresco"
                on:change={handleChange}
            />
            <Input type="date" id="expiring_date" label="Data de Vencimento" disabled={isFresh} />
            <Button type="submit">Adicionar Entrada</Button>
        </form>
    </svelte:fragment>
    <div slot="footer"></div>
</Modal>
