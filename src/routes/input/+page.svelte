<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import Select from "$lib/components/Select.svelte"
    import Table from "$lib/components/Table/Table.svelte"
    import type { DrawerSettings } from "@skeletonlabs/skeleton"
    import { getDrawerStore } from "@skeletonlabs/skeleton"

    const drawer = getDrawerStore()

    const drawerSettings: DrawerSettings = {
        width: "w-1/2",
        id: "input",
        padding: "p-4",
        position: "right",
    }

    export let data
    $: showModal = false
    const products = (data?.products || []).map((product) => ({
        name: product.name,
        id: product.id,
    }))

    $: inputs = data?.inputs || []

    let isFresh = false
</script>

<div class="flex flex-col w-full py-6">
    <section class="flex justify-between">
        <h1 class="text-2xl font-bold">Lista de Entradas</h1>
        <Button on:click={() => drawer.open(drawerSettings)}>Adicionar Entrada</Button>
    </section>
</div>

<section class="table-container">
    <Table
        columns={[
            { label: "Produto", sort: "productName" },
            { label: "Quantidade", sort: "amount" },
            { label: "Preço", sort: "price" },
            { label: "Data de Vencimento", sort: "expiration_date" },
            { label: "Produto Fresco", sort: "fresh" },
        ]}
        data={inputs}
    />
</section>

<Modal bind:showModal headerText="Entrada de Produtos" confirmFunction={() => console.log("Test")}>
    <svelte:fragment slot="body">
        <form method="post" class="flex flex-col gap-y-4">
            <Input name="amount" id="amount" type="number" label="Código de barras" />
            <Select options={products} label="Produto" />
            <Input name="amount" id="amount" type="number" label="Quantidade" />
            <Input name="price" id="price" type="number" label="Preço" />
            <div class="flex flex-col gap-y-1 items-start">
                <label for="fresh">Produto Fresco</label>
                <input
                    name="fresh"
                    id="fresh"
                    type="checkbox"
                    class=""
                    on:change={(e) => (isFresh = e.currentTarget.checked)}
                />
            </div>
            <Input type="date" id="expiring_date" label="Data de Vencimento" />
            <Button type="submit">Adicionar Entrada</Button>
        </form>
    </svelte:fragment>
    <div slot="footer"></div>
</Modal>
