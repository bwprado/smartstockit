<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import EmptyWrapper from "$lib/components/EmptyWrapper.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import PageHeader from "$lib/components/PageHeader.svelte"
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

<PageHeader title="Saídas">
    <Button class="w-fit" on:click={() => (showModal = true)}>Retirar Produto</Button>
</PageHeader>

<EmptyWrapper title="Sem dados" message="Nenhuma saída registrada ainda." length={outputs.length}>
    <section class="table-container rounded-lg" slot="content">
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
            data={outputs} />
    </section>
</EmptyWrapper>

<Modal bind:showModal headerText="Retirar Produto" confirmFunction={() => console.log("Remove")}>
    <form slot="body" method="POST" class="flex flex-col gap-y-4 h-full">
        <SelectSearch name="product" id="product" label="Produto" options={searchableProducts} />
        <Input label="Quantidade" id="amount" name="amount" type="number" />
        <input type="hidden" name="price" value={0} />
        <Button
            type="submit"
            id="retrieve_product"
            class="w-full mt-auto"
            on:click={() => (loading = true)}
            {loading}>Retirar do Estoque</Button>
    </form>
    <svelte:fragment slot="footer">
        <div />
    </svelte:fragment>
</Modal>
