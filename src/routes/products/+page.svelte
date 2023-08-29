<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import Select from "$lib/components/Select.svelte"
    import Table from "$lib/components/Table/Table.svelte"

    export let data
    $: showModal = false
    $: showAddModal = false
    const products = data?.products || []
</script>

<div class="flex flex-col gap-y-10 w-full">
    <section class="flex justify-between">
        <h1 class="text-2xl font-bold">Lista de Produtos</h1>
        <Button
            on:click={() => {
                console.log(showAddModal)
                showAddModal = true
            }}>Adicionar Produto</Button
        >
    </section>

    <section class="table-container">
        <Table
            columns={[
                { label: "Nome", sort: "name", type: "string" },
                { label: "Unidade", sort: "unit", type: "string" },
                { label: "Saldo", sort: "balance", type: "number" },
            ]}
            data={products}
            index={1}
        />
    </section>
</div>

<Modal bind:showModal confirmFunction={() => console.log("Save this")} headerText="Editar Produto">
    <div slot="body" class="w-full">
        <Input label="Nome" name="product_name" />
    </div>
</Modal>

<Modal
    bind:showModal={showAddModal}
    confirmFunction={() => console.log("Save adition")}
    headerText="Adicionar Produto"
>
    <form
        slot="body"
        method="POST"
        class="grid grid-rows-3 gap-x-4 py-4 items-center justify-center w-full text-gary"
    >
        <Input label="Nome" name="name" type="text" />
        <Select
            label="Unidade"
            name="unit"
            options={[
                { name: "und", id: "und" },
                { name: "kg", id: "kg" },
                { name: "l", id: "l" },
            ]}
            id="unit"
        />
        <Button type="submit" id="add_product">Adicionar</Button>
    </form>
    <svelte:fragment slot="footer">
        <div />
    </svelte:fragment>
</Modal>
