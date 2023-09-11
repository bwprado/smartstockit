<script lang="ts">
    import { invalidate, invalidateAll } from "$app/navigation"
    import Button from "$lib/components/Button.svelte"
    import EmptyWrapper from "$lib/components/EmptyWrapper.svelte"
    import IconButton from "$lib/components/IconButton.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import PageHeader from "$lib/components/PageHeader.svelte"
    import RadioGroup from "$lib/components/RadioGroup.svelte"
    import Select from "$lib/components/Select.svelte"
    import SelectSearch from "$lib/components/SelectSearch.svelte"
    import Table from "$lib/components/Table/Table.svelte"
    import { getModalStore, getToastStore } from "@skeletonlabs/skeleton"
    import { Plus, QrCode, Trash } from "lucide-svelte"
    import { twMerge } from "tailwind-merge"
    import type { Product } from "../../../types/supabase"
    import type { ActionData, PageServerData } from "./$types"
    import Composition from "$lib/components/Composition.svelte"

    const toast = getToastStore()
    const modal = getModalStore()

    export let data: PageServerData
    export let form: ActionData

    let selectedProduct: Product | undefined
    let categoryValue: string = ""
    let selectedType: string = "product"

    $: showModal = false
    $: selectedProduct
    $: loading = false

    const handleRowClick = (id: string) => {
        selectedProduct = data.products.find((product) => product.id === id) || undefined
        showModal = true
    }

    if (form?.status) {
        toast.trigger({
            message: form.body,
        })
    }

    const handleDeleteClick = () => {
        showModal = false
        modal.trigger({
            type: "confirm",
            title: "Deletar Produto",
            body: "Tem certeza que deseja deletar este produto?",
            response: async (response) => {
                if (response) {
                    const res = await fetch(
                        `/api/delete-product?id=${selectedProduct?.id || undefined}`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        },
                    )
                    const data = (await res.json()) || {}
                    const { error } = data
                    if (error) {
                        console.log(error)

                        toast.trigger({
                            message: "Erro ao deletar produto, entre em contato com o suporte.",
                        })
                    } else {
                        invalidateAll()
                        toast.trigger({
                            message: "Produto deletado com sucesso",
                        })
                    }
                }
            },
        })
    }

    const handleAddCategory = async (e: MouseEvent) => {
        e.preventDefault()
        if (categoryValue === "") {
            toast.trigger({
                message: "O nome da categoria não pode ser vazio.",
            })
            return
        }
        const res = await fetch(`/api/add-category`, {
            method: "POST",
            body: JSON.stringify({ name: categoryValue, ref: "products" }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const json = (await res.json()) || {}
        const { error, data: category } = json
        if (error) {
            console.log(error)

            toast.trigger({
                message: "Erro ao criar categoria, entre em contato com o suporte.",
            })
        } else {
            toast.trigger({
                message: "Categoria criada com sucesso.",
            })
        }
        invalidate("/products")
        data.categories = [...data.categories, category]
    }

    const handleReadBarcode = (e) => {
        e.preventDefault()
        e.stopPropagation()
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            const video = document.querySelector("#barcode video")
            if (video) {
                video.srcObject = stream
                video.play()
            }
        })
    }
</script>

<div class="flex flex-col gap-y-10 w-full h-full">
    <PageHeader title="Produtos">
        <Button
            class="max-w-max"
            on:click={() => {
                selectedProduct = undefined
                showModal = true
            }}>Adicionar Produto</Button>
    </PageHeader>
    <EmptyWrapper
        message="Nenhum Produto adicionado ainda, para adicionar um produto basta clicar no botão acima."
        length={data.products.length}>
        <section class={twMerge("table-container", "rounded-lg")} slot="content">
            <Table
                columns={[
                    { label: "Nome", key: "name", type: "string" },
                    { label: "Unidade", key: "unit", type: "string" },
                    { label: "Saldo", key: "balance", type: "number" },
                    { label: "Minínmo", key: "min", type: "number" },
                    { label: "Máximo", key: "max", type: "number" },
                    { label: "Aviso", key: "warning", type: "boolean" },
                    { label: "Categoria", key: "category", type: "string" },
                ]}
                data={data.products}
                index={0}
                {handleRowClick} />
        </section>
    </EmptyWrapper>
</div>

<Modal
    bind:showModal
    confirmFunction={() => console.log("Save adition")}
    headerText={selectedProduct ? "Editar Produto" : "Adicionar Produto"}>
    <svelte:fragment slot="action">
        {#if selectedProduct}
            <form method="POST" action="?/deleteUser">
                <IconButton on:click={handleDeleteClick} intent="secondary">
                    <Trash
                        class="text-gray-900 dark:text-primary-500 hover:text-primary-500 dark:hover:text-gray-200" />
                </IconButton>
            </form>
        {/if}
    </svelte:fragment>
    <form
        on:submit
        slot="body"
        method="POST"
        class="grid grid-rows-[auto,max-content] w-full h-full gap-y-4"
        action={selectedProduct ? "?/editProduct" : "?/addProduct"}>
        <div class="flex flex-col w-full gap-6">
            <RadioGroup
                label="Tipo de Produto"
                name="radio-product-type"
                bind:selected={selectedType}
                options={[
                    { label: "Produto", value: "product" },
                    { label: "Insumo", value: "raw" },
                    { label: "Kit", value: "kit" },
                ]} />
            <Input
                label="Nome"
                name="name"
                type="text"
                id="name"
                required
                placeholder="Nome do Produto"
                value={selectedProduct?.name || ""} />
            <div class="flex gap-x-4">
                <Input
                    label="Marca"
                    name="brand"
                    type="text"
                    id="brand"
                    required
                    placeholder="Marca do Produto"
                    value={selectedProduct?.brand || ""} />
                <Input
                    label="Fornecedor"
                    name="supplier"
                    type="text"
                    id="supplier"
                    required
                    placeholder="Fornecedor"
                    value={selectedProduct?.supplier || ""} />
            </div>
            <div class="flex items-end gap-x-4">
                <Input
                    id="barcode"
                    label="Código"
                    name="barcode"
                    type="text"
                    value={selectedProduct?.barcode || ""}
                    placeholder="79823980123989" />
                <Button id="read-barcode" class="max-w-max" on:click={handleReadBarcode}
                    ><QrCode /></Button>
            </div>
            <div class="grid grid-cols-[1fr,max-content] gap-x-4 items-end justify-center">
                <SelectSearch
                    label="Categoria"
                    on:change={(e) => (categoryValue = e?.target?.value || "")}
                    options={data.categories.map((cat) => ({ label: cat.name, value: cat.id }))}
                    id="category"
                    name="category"
                    placeholder="Categoria do Produto" />
                <Button on:click={handleAddCategory} type="submit" intent="primary">
                    <Plus size={25} class="text-primary-500 dark:text-white" />
                </Button>
            </div>
            <div class="grid grid-cols-2 gap-x-4">
                <Input
                    label="Quantidade Mínima"
                    name="min"
                    id="min"
                    type="btn-number"
                    value={`${selectedProduct?.min}` || ""} />
                <Input
                    label="Quantidade Máxima"
                    name="max"
                    id="max"
                    type="btn-number"
                    value={`${selectedProduct?.max}` || ""} />
            </div>
            <Select
                label="Unidade"
                name="unit"
                value={selectedProduct?.unit || ""}
                options={[
                    { name: "und", id: "und" },
                    { name: "kg", id: "kg" },
                    { name: "l", id: "l" },
                ]}
                id="unit" />
            {#if selectedProduct}
                <Input name="id" id="id" value={selectedProduct.id} type="hidden" />
            {/if}
            <Composition
                label="Composição"
                options={[
                    { label: "Açucar", value: "sugar" },
                    { label: "Trigo", value: "trigo" },
                ]} />
        </div>
        <div class="py-6 sm:py-0">
            <Button type="submit" id="add_product" on:click={() => (loading = true)} {loading}
                >{selectedProduct ? "Editar" : "Adicionar"}</Button>
        </div>
    </form>
    <svelte:fragment slot="footer">
        <div />
    </svelte:fragment>
</Modal>
