<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import EmptyWrapper from "$lib/components/EmptyWrapper.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import PageHeader from "$lib/components/PageHeader.svelte"
    import SelectSearch from "$lib/components/SelectSearch.svelte"
    import Table from "$lib/components/Table/Table.svelte"

    import { getToastStore } from "@skeletonlabs/skeleton"
    import _ from "lodash"
    import { Minus } from "lucide-svelte"
    import { z } from "zod"
    import type { Inventory } from "../../../types/supabase"
    import type { PageServerData } from "./$types"

    const toast = getToastStore()

    export let data: PageServerData

    let selectedOutput: any = {}
    let selectedProduct: any = {}

    $: showModal = false
    $: loading = false

    const Output = z.object({
        id: z.string().optional(),
        product: z.string(),
        amount: z.string(),
    })

    const searchableProducts = data.products.map((product) => ({
        value: product.id,
        label: product.name,
        keywords: product.name.split(" ").join(", ").toLocaleLowerCase(),
    }))

    const handleSubmit = async () => {
        const validation = Output.safeParse(selectedOutput)
        if (!validation.success) {
            showModal = false
            toast.trigger({
                message: "Preencha todos os campos corretamente.",
                background: "bg-error-500",
            })
            return
        }

        loading = true
        const res = await fetch("/api/output", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedOutput),
        })

        if (res.ok) {
            const output: Inventory = await res.json()
            data.outputs = [
                ...data.outputs,
                {
                    ...output,
                    productName: data.products.find((p) => p.id === output.product)?.name,
                },
            ]

            loading = false
            showModal = false
            selectedOutput = {}
            selectedProduct = {}

            toast.trigger({
                message: "Produto retirado com sucesso!",
            })
        } else {
            toast.trigger({
                message: "Ocorreu um erro ao retirar o produto.",
            })
        }
    }

    const handleRowClick = (id: string) => {
        selectedOutput = data.outputs.find((output) => output.id === id)
        selectedProduct = data.products.find((product) => product.id === selectedOutput.product)
        showModal = true
    }
</script>

<PageHeader title="Saídas" class="pb-4">
    <Button
        slot="action"
        class="w-fit"
        on:click={() => {
            showModal = true
            selectedOutput = {}
            selectedProduct = {}
        }}><Minus />Produto</Button>
</PageHeader>

<EmptyWrapper
    title="Sem dados"
    message="Nenhuma saída registrada ainda."
    length={data.outputs.length}>
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
            data={data.outputs}
            {handleRowClick} />
    </section>
</EmptyWrapper>

<Modal
    bind:showModal
    headerText={_.isEmpty(selectedOutput) ? "Retirar Produto" : "Alterar Retirada"}>
    <div slot="body" class="flex flex-col gap-y-4 h-full">
        <SelectSearch
            on:selection={(e) => {
                selectedOutput.product = e.detail.value
                selectedProduct = data.products.find((product) => product.id === e.detail.value)
            }}
            required
            name="product"
            id="product"
            label="Produto"
            options={searchableProducts}
            inputValue={selectedProduct.name || ""} />
        <Input
            required
            label="Quantidade"
            id="amount"
            name="amount"
            type="btn-number"
            bind:value={selectedOutput.amount} />
    </div>
    <svelte:fragment slot="footer">
        <Button
            type="submit"
            id="retrieve_product"
            class="w-full mt-auto"
            on:click={handleSubmit}
            {loading}>Retirar do Estoque</Button>
    </svelte:fragment>
</Modal>
