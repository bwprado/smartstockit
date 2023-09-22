<script lang="ts">
    import { invalidate, invalidateAll } from "$app/navigation"
    import Button from "$lib/components/Button.svelte"
    import Composition from "$lib/components/Composition.svelte"
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
    import type { ProductForm } from "../../../types/supabase"
    import type { ActionData, PageServerData } from "./$types"

    const toast = getToastStore()
    const modal = getModalStore()

    export let data: PageServerData
    export let form: ActionData

    let initialValue: ProductForm = {
        composition: [],
        name: "",
        unit: { name: "", id: "" },
        min: 0,
        max: 0,
        balance: 0,
        barcode: "",
        brand: { value: "", label: "" },
        category: { value: "", label: "" },
        supplier: { value: "", label: "" },
        type: "product" as "product" | "raw" | "kit",
    }

    $: showModal = false
    $: selectedProduct = initialValue
    $: loading = false
    $: products = data.products

    const handleRowClick = (id: string) => {
        selectedProduct = products.find((product) => product.id === id) || selectedProduct
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
                        `/api/products/delete?id=${selectedProduct?.id || undefined}`,
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
        const res = await fetch(`/api/add-category`, {
            method: "POST",
            body: JSON.stringify({ name: selectedProduct.category, ref: "products" }),
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

    const handleReadBarcode = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            // const video = document.querySelector("#barcode video")
            // if (video) {
            //     video.srcObject = stream
            //     video.play()
            // }
        })
    }

    const handleAddBrand = async (e: MouseEvent) => {
        const res = await fetch(`/api/add-brand`, {
            method: "POST",
            body: JSON.stringify({ name: selectedProduct.brand, ref: "products" }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const json = (await res.json()) || {}
        const { error, data: brand } = json
        if (error) {
            console.log(error)

            toast.trigger({
                message: "Erro ao criar marca, entre em contato com o suporte.",
            })
        } else {
            toast.trigger({
                message: "Marca criada com sucesso.",
            })
        }
        invalidate("/products")
        data.brands = [...data.brands, brand]
    }
    const handleAddProductClick = async () => {
        const res = await fetch(`/api/products/add`, {
            method: "POST",
            body: JSON.stringify(selectedProduct),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const json = (await res.json()) || {}
        const { error, data: product } = json
        if (error) {
            console.log(error)
            toast.trigger({
                message: "Erro ao criar produto, entre em contato com o suporte.",
                classes: "z-50",
            })
        } else {
            toast.trigger({
                message: "Produto criado com sucesso.",
            })
        }
        products = [...products, product]
    }
</script>

<div class="flex flex-col gap-y-10 w-full h-full">
    <PageHeader title="Produtos">
        <Button
            class="max-w-max"
            on:click={() => {
                selectedProduct = initialValue
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
                    { label: "Unidade", key: "units.acronym", type: "string" },
                    { label: "Saldo", key: "balance", type: "number" },
                    { label: "Minínmo", key: "min", type: "number" },
                    { label: "Máximo", key: "max", type: "number" },
                    { label: "Categoria", key: "category.label", type: "string" },
                    { label: "Marca", key: "brand.label", type: "string" },
                    { label: "Fornecedor", key: "supplier.label", type: "string" },
                ]}
                data={data.products}
                index={0}
                {handleRowClick} />
        </section>
    </EmptyWrapper>
</div>

<Modal
    bind:showModal
    position="right"
    confirmFunction={() => console.log("Save adition")}
    headerText={selectedProduct.name ? "Editar Produto" : "Adicionar Produto"}>
    <svelte:fragment slot="action">
        {#if selectedProduct}
            <form method="POST" action="?/deleteUser">
                <IconButton on:click={handleDeleteClick} intent="secondary">
                    <svelte:fragment slot="icon">
                        <Trash />
                    </svelte:fragment>
                </IconButton>
            </form>
        {/if}
    </svelte:fragment>
    <div slot="body" class="grid grid-rows-[auto,max-content] w-full h-full gap-y-4">
        <div class="flex flex-col w-full gap-6">
            <RadioGroup
                label="Tipo de Produto"
                name="radio-product-type"
                bind:selected={selectedProduct.type}
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
                bind:value={selectedProduct.name} />
            <SelectSearch
                on:selection={(e) => {
                    selectedProduct.brand.value = e.detail.value
                    selectedProduct.brand.label = e.detail.label
                }}
                on:input={(e) => {
                    if (e?.target?.value === "") {
                        selectedProduct.brand.value = ""
                    }
                }}
                label="Marca"
                name="brand"
                id="brand"
                required
                bind:inputValue={selectedProduct.brand.label}
                placeholder="Marca do Produto"
                options={[{ value: "uniao", label: "União" }]}>
                <Button
                    slot="action"
                    on:click={handleAddBrand}
                    type="submit"
                    intent="secondary"
                    class="w-fit"
                    disabled={selectedProduct.brand.label === "" ||
                        selectedProduct.brand.value !== ""}>
                    <Plus size={25} />
                </Button>
            </SelectSearch>
            <SelectSearch
                on:selection={(e) => {
                    selectedProduct.supplier.label = e.detail.label
                    selectedProduct.supplier.value = e.detail.value
                }}
                on:input={(e) => {
                    if (e?.target?.value === "") {
                        selectedProduct.supplier.value = ""
                    }
                }}
                label="Fornecedor"
                name="supplier"
                id="supplier"
                placeholder="Fornecedor"
                bind:inputValue={selectedProduct.supplier.label}>
                <Button
                    slot="action"
                    on:click={handleAddBrand}
                    type="submit"
                    intent="secondary"
                    class="w-fit"
                    disabled={selectedProduct.supplier.label === "" ||
                        selectedProduct.supplier.value !== ""}>
                    <Plus size={25} />
                </Button>
            </SelectSearch>
            <Input
                id="barcode"
                label="Código"
                name="barcode"
                type="text"
                bind:value={selectedProduct.barcode}
                placeholder="79823980123989">
                <Button slot="action" id="read-barcode" class="w-fit" on:click={handleReadBarcode}
                    ><QrCode /></Button>
            </Input>
            <SelectSearch
                on:selection={(e) => {
                    selectedProduct.category.value = e.detail.value
                    selectedProduct.category.label = e.detail.label
                }}
                on:input={(e) => {
                    if (e?.target?.value === "") {
                        selectedProduct.category.value = ""
                    }
                }}
                label="Categoria"
                options={data.categories.map((cat) => ({ label: cat.name, value: cat.id }))}
                id="category"
                name="category"
                bind:inputValue={selectedProduct.category.label}
                placeholder="Categoria do Produto">
                <Button
                    slot="action"
                    on:click={handleAddCategory}
                    type="submit"
                    intent="secondary"
                    class="w-fit"
                    disabled={selectedProduct.category.label === "" ||
                        selectedProduct.category.value !== ""}>
                    <Plus size={25} />
                </Button>
            </SelectSearch>
            <div class="grid grid-cols-2 gap-x-4">
                <Input
                    label="Quantidade Mínima"
                    name="min"
                    id="min"
                    type="btn-number"
                    bind:value={selectedProduct.min} />
                <Input
                    label="Quantidade Máxima"
                    name="max"
                    id="max"
                    type="btn-number"
                    bind:value={selectedProduct.max} />
            </div>
            <Select
                label="Unidade"
                name="unit"
                bind:value={selectedProduct.unit.id}
                options={data.units.map((unit) => ({ name: unit?.name, id: unit?.id }))}
                id="unit" />
            {#if selectedProduct}
                <input name="id" id="id" value={selectedProduct.id} type="hidden" />
            {/if}
            {#if selectedProduct.type === "product"}
                <Composition
                    bind:composition={selectedProduct.composition}
                    label="Composição"
                    options={[
                        { label: "Açucar", value: "sugar" },
                        { label: "Trigo", value: "trigo" },
                    ]} />
            {/if}
        </div>
        <div class="py-6 sm:py-0">
            <Button id="add_product" on:click={handleAddProductClick} {loading}
                >{selectedProduct.name ? "Editar" : "Adicionar"}</Button>
        </div>
    </div>
    <svelte:fragment slot="footer">
        <div />
    </svelte:fragment>
</Modal>
