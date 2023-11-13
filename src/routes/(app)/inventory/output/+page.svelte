<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import EmptyWrapper from "$lib/components/EmptyWrapper.svelte"
    import IconButton from "$lib/components/IconButton.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import PageHeader from "$lib/components/PageHeader.svelte"
    import SelectSearch from "$lib/components/SelectSearch.svelte"
    import Table from "$lib/components/Table/Table.svelte"

    import { getModalStore, getToastStore } from "@skeletonlabs/skeleton"
    import { ArrowDown, Trash, Edit } from "lucide-svelte"
    import type { Inventory, Product } from "../../../../types/supabase"
    import type { PageServerData } from "./$types"

    const toast = getToastStore()
    const modal = getModalStore()

    export let data: PageServerData

    let selectedOutput: any = {}
    let selectedProduct: any = {}
    let selectedOutputProducts: { label: string; id: string; amount: number }[] = []

    $: showModal = false
    $: loading = false

    const searchableProducts = data.products.map((product) => ({
        value: product.id,
        label: product.name,
        keywords: product.name.split(" ").join(", ").toLocaleLowerCase(),
    }))

    const handleSubmit = async () => {
        if (selectedOutputProducts.length === 0) {
            showModal = false
            toast.trigger({
                message: "Adicione os produtos que deseja fazer retirada.",
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
            body: JSON.stringify(selectedOutputProducts),
        })

        if (res.ok) {
            const outputs: Inventory[] = await res.json()
            data.outputs = [
                ...data.outputs,
                ...outputs.map((output) => ({
                    ...output,
                    productName: data.products.find((product) => product.id === output.product)
                        ?.name,
                })),
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

    const handleSaveClick = async (outputData: any) => {
        const res = await fetch(`/api/output`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(outputData),
        })

        if (res.ok) {
            const updatedOutput: Inventory = await res.json()
            const updatedIndex = data.outputs.findIndex((o) => o.id === updatedOutput.id)
            data.outputs[updatedIndex] = {
                ...data.outputs[updatedIndex],
                amount: updatedOutput.amount,
            }

            toast.trigger({
                message: "Saída atualizada com sucesso!",
            })
        } else {
            toast.trigger({
                message: "Ocorreu um erro ao atualizar a saída.",
            })
        }
    }

    const handleRowClick = (id: string) => {
        const clickedProduct = data.outputs.find((output) => output.id === id)
        modal.trigger({
            type: "component",
            component: "modalEditOutput",
            meta: {
                product: clickedProduct,
                removeFunction: () => handleDeleteClick(clickedProduct?.id || ""),
                closeFunction: () => modal.close(),
            },
            response: (r) => r && handleSaveClick(r),
        })
    }

    const handleDeleteClick = async (id: string) => {
        if (!id) return

        modal.close()

        modal.trigger({
            type: "confirm",
            title: "Tem certeza que deseja excluir essa saída?",
            body: "Essa ação não pode ser desfeita.",
            buttonTextConfirm: "Excluir",
            response: async (r) => {
                if (r) {
                    const res = await fetch(`/api/output`, {
                        method: "DELETE",
                        body: JSON.stringify(id),
                    })
                    if (res.ok) {
                        data.outputs = data.outputs.filter((output) => output.id !== id)
                        toast.trigger({
                            message: "Saída excluída com sucesso!",
                        })
                    } else {
                        toast.trigger({
                            message: "Ocorreu um erro ao excluir a saída.",
                            background: "bg-error-500",
                        })
                    }
                }
            },
        })
    }

    const handleAddProductToOutuput = () => {
        selectedOutputProducts = [
            ...selectedOutputProducts,
            {
                label: selectedProduct?.name,
                id: selectedProduct?.id,
                amount: selectedOutput.amount,
            },
        ]
        selectedOutput = { amount: "0" }
        selectedProduct = {}
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
            selectedOutputProducts = []
        }}>Retirar Produto</Button>
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
            {handleRowClick}>
        </Table>
    </section>
</EmptyWrapper>

<Modal bind:showModal headerText="Retirar Produtos">
    <div slot="body" class="flex flex-col gap-y-4 h-full">
        <p class="text-xs text-surface-300">
            Selecione o produto que deseja adicionar à uma retirada, juntamente com a quantidade que
            desejas e clique em <strong>Adicionar à Retirada</strong>. Você pode adicionar quantos
            produtos quiser.
        </p>
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
            message="Insira quantos produtos foram retirados."
            required
            label="Quantidade"
            id="amount"
            name="amount"
            type="btn-number"
            bind:value={selectedOutput.amount} />
        <Button
            class="h-10"
            type="button"
            intent="secondary"
            on:click={handleAddProductToOutuput}
            disabled={selectedOutput.id || +selectedOutput.amount <= 0}>
            <ArrowDown />
            Adicionar à Retirada
        </Button>
        <EmptyWrapper
            title="Nenhum produto adicionado"
            message="Nenhum produto adicionado para realização da retirada."
            length={selectedOutputProducts.length}>
            <section class="table-container rounded-lg" slot="content">
                <Table
                    columns={[
                        {
                            label: "Produto",
                            key: "label",
                            type: "string",
                        },
                        {
                            label: "Quantidade",
                            key: "amount",
                            type: "number",
                        },
                        {
                            label: "",
                            key: "edit",
                            type: "edit",
                        },
                    ]}
                    data={selectedOutputProducts}>
                    <svelte:fragment slot="action">
                        <IconButton>
                            <Trash />
                        </IconButton>
                    </svelte:fragment>
                </Table>
            </section>
        </EmptyWrapper>
    </div>
    <svelte:fragment slot="footer">
        <Button
            type="submit"
            id="retrieve_product"
            class="w-full mt-auto"
            on:click={handleSubmit}
            {loading}>Retirar Produto</Button>
    </svelte:fragment>
</Modal>
