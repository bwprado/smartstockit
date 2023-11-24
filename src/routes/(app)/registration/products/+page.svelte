<script lang="ts">
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

    import { invalidate } from "$app/navigation"
    import Symbol from "$lib/components/Symbol.svelte"
    import { getModalStore, getToastStore, type ModalSettings } from "@skeletonlabs/skeleton"
    import { Html5Qrcode } from "html5-qrcode"
    import { Plus, QrCode, Search, Trash, X } from "lucide-svelte"
    import { onMount } from "svelte"
    import { twMerge } from "tailwind-merge"
    import { z } from "zod"
    import type { PageServerData } from "./$types"
    import { page } from "$app/stores"

    const addProductSchema = z.object({
        name: z.string().min(1, "Nome do produto não pode ser vazio."),
        unit: z.object({
            name: z.string().min(1, "Unidade do produto não pode ser vazio."),
        }),
    })

    const toast = getToastStore()
    const modal = getModalStore()

    export let data: PageServerData

    let initialValue: any = {
        composition: [],
        name: "",
        unit: { name: "", id: "" },
        min: 0,
        max: 0,
        balance: 0,
        price: 0,
        cost: 0,
        barcode: "",
        brand: { value: "", label: "" },
        category: { value: "", label: "" },
        supplier: { value: "", label: "" },
        type: "product" as "product" | "raw" | "kit",
    }

    $: showModal = false
    $: selectedProduct = initialValue
    $: loading = false
    $: loadingBrand = false
    $: loadingCategory = false
    $: loadingSupplier = false
    $: compositionProducts = data.products
        .filter((product) => product.type === "raw")
        .map((product) => ({
            label: product?.name || "",
            value: product?.id || "",
            acronym: product?.units?.acronym || "",
        }))
    $: unitsOptions = data.units.map((unit) => ({
        name: unit.name,
        id: unit.id,
    }))
    $: brandsOptions = data.brands.map((brand) => ({ label: brand.name, value: brand.id }))
    $: categoriesOptions = data.categories.map((cat) => ({ label: cat.name, value: cat.id }))
    $: suppliersOptions = data.suppliers.map((supplier) => ({
        label: supplier.name,
        value: supplier.id,
    }))
    $: searchLoading = false
    $: search = ""
    $: searched = false

    let html5Qrcode: Html5Qrcode
    onMount(() => {
        html5Qrcode = new Html5Qrcode("reader")
    })

    const handleRowClick = (id: string) => {
        const product = data.products.find((product) => product.id === id)
        selectedProduct = {
            ...product,
            unit: { name: product?.units?.name || "", id: product?.units?.id || "" },
            brand: { value: product?.brands?.id || "", label: product?.brands?.name || "" },
            category: {
                value: product?.categories?.id || "",
                label: product?.categories?.name || "",
            },
            supplier: {
                value: product?.suppliers?.id || "",
                label: product?.suppliers?.name || "",
            },
            composition: product?.composition || [],
        }
        showModal = true
    }

    const handleDeleteClick = () => {
        const deleteProductId = selectedProduct.id
        showModal = false
        modal.trigger({
            type: "confirm",
            title: "Deletar Produto",
            body: "Tem certeza que deseja deletar este produto?",
            response: async (response) => {
                if (response) {
                    const res = await fetch(`/api/products/delete?id=${deleteProductId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })

                    if (res?.status !== 200) {
                        toast.trigger({
                            message: "Erro ao deletar produto, entre em contato com o suporte.",
                            background: "bg-error-500",
                        })
                        return
                    }

                    const removedProduct = (await res.json()) || {}

                    data.products = data.products.filter(
                        (product) => product.id !== removedProduct.id,
                    )
                    toast.trigger({
                        message: "Produto deletado com sucesso",
                    })
                }
            },
        })
    }

    const handleEditProduct = async () => {
        loading = true
        const res = await fetch(`/api/products/edit?id=${selectedProduct.id}`, {
            method: "PUT",
            body: JSON.stringify(selectedProduct),
            headers: {
                "Content-Type": "application/json",
            },
        })

        try {
            const product = (await res.json()) || {}

            data.products = data.products.map((p) => (p.id === product.id ? product : p))
            loading = false
            showModal = false
            toast.trigger({
                message: "Produto editado com sucesso.",
                classes: "z-50",
            })
        } catch (error) {
            console.log(error)
            toast.trigger({
                message: "Erro ao editar produto, entre em contato com o suporte.",
                classes: "z-50",
            })
        }
    }

    const handleAddCategory = async (e: MouseEvent) => {
        const modalCattegorySettings: ModalSettings = {
            type: "prompt",
            title: "Adicionar Fornecedor",
            body: "Digite o nome da fornecedor que deseja adicionar.",
            valueAttr: { type: "text", required: true, minlenght: 3 },
            buttonTextCancel: "Cancelar",
            buttonTextSubmit: "Adicionar",
            response: async (response) => {
                if (response && response.length > 3) {
                    try {
                        loadingCategory = true
                        const res = await fetch(`/api/categories`, {
                            method: "POST",
                            body: JSON.stringify({ name: response }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                        const category = (await res.json()) || {}
                        toast.trigger({
                            message: "Categoria criada com sucesso.",
                        })

                        invalidate("/products")

                        data.categories = [...data.categories, category]

                        categoriesOptions = [
                            ...categoriesOptions,
                            { label: category.name, value: category.id },
                        ]
                        selectedProduct.category.value = category.id
                        selectedProduct.category.label = category.name

                        showModal = true
                    } catch (error) {
                        console.log(error)

                        toast.trigger({
                            message: "Erro ao criar categoria, entre em contato com o suporte.",
                        })
                    }
                } else {
                    showModal = true
                }
            },
        }
        showModal = false
        modal.trigger(modalCattegorySettings)
    }

    const handleAddBrand = async (e: MouseEvent) => {
        const modalBrandSettings: ModalSettings = {
            type: "prompt",
            title: "Adicionar Marca",
            body: "Digite o nome da marca que deseja adicionar.",
            valueAttr: { type: "text", required: true, minlenght: 3 },
            buttonTextCancel: "Cancelar",
            buttonTextSubmit: "Adicionar",
            response: async (response) => {
                if (response && response.length > 3) {
                    try {
                        const res = await fetch(`/api/brands`, {
                            method: "POST",
                            body: JSON.stringify({ name: response }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                        const brand = (await res.json()) || {}
                        toast.trigger({
                            message: "Marca criada com sucesso.",
                            classes: "z-50",
                        })

                        invalidate("/products")

                        data.brands = [...data.brands, brand]
                        brandsOptions = [...brandsOptions, { label: brand.name, value: brand.id }]
                        selectedProduct.brand.value = brand.id
                        selectedProduct.brand.label = brand.name
                        showModal = true
                    } catch (error) {
                        console.log(error)
                        toast.trigger({
                            message: "Erro ao criar marca, entre em contato com o suporte.",
                            classes: "z-50",
                        })
                    }
                } else {
                    showModal = true
                }
            },
        }
        showModal = false
        modal.trigger(modalBrandSettings)
    }

    const handleAddSupplier = async (e: MouseEvent) => {
        const modalSupplierSettings: ModalSettings = {
            type: "prompt",
            title: "Adicionar Fornecedor",
            body: "Digite o nome da fornecedor que deseja adicionar.",
            valueAttr: { type: "text", required: true, minlenght: 3 },
            buttonTextCancel: "Cancelar",
            buttonTextSubmit: "Adicionar",
            response: async (response) => {
                if (response && response.length > 3) {
                    try {
                        const res = await fetch(`/api/suppliers`, {
                            method: "POST",
                            body: JSON.stringify({ name: response }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                        const { data: supplier } = (await res.json()) || {}

                        toast.trigger({
                            message: "Fornecedor criado com sucesso.",
                            classes: "z-50",
                        })

                        invalidate("/products")

                        data.suppliers = [...data.suppliers, supplier]
                        suppliersOptions = [
                            ...suppliersOptions,
                            { label: supplier.name, value: supplier.id },
                        ]
                        selectedProduct.supplier.value = supplier.id
                        selectedProduct.supplier.label = supplier.name
                        showModal = true
                    } catch (error) {
                        console.log(error)
                        toast.trigger({
                            message: "Erro ao criar fornecedor, entre em contato com o suporte.",
                        })
                    }
                } else {
                    showModal = true
                }
            },
        }
        showModal = false
        modal.trigger(modalSupplierSettings)
    }

    const handleSelectSearchInput = (e: Event, prop: string) => {
        if ((e?.target as HTMLInputElement).value === "") {
            prop = ""
        }
    }

    const handleSearch = async () => {
        searchLoading = true
        const res = await fetch(`/api/products/search?for=${search}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (res.ok) {
            const searchProducts = await res.json()
            data.products = searchProducts
            searched = true
        }
        searchLoading = false
    }

    const handleClearSearch = async () => {
        if (!search || !searched) return

        searchLoading = true
        searched = false
        search = ""
        await invalidate("products")
        searchLoading = false
    }

    const handleReadBarcode = async (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        const cameras = await Html5Qrcode.getCameras()

        html5Qrcode.start(
            cameras[0].id,
            {
                fps: 10,
                qrbox: 250,
            },
            onScanSuccess,
            onScanFailure,
        )
    }

    const onScanSuccess = (decodedText: string, decodedResult: any) => {
        html5Qrcode.stop()
        console.log(decodedText)
    }

    const onScanFailure = (error: any) => {
        html5Qrcode.stop()
        console.log(error)
    }

    const handleAddProductClick = async () => {
        try {
            await addProductSchema.parseAsync(selectedProduct)
            loading = true
            const res = await fetch(`/api/products/add`, {
                method: "POST",
                body: JSON.stringify(selectedProduct),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const { product, error } = (await res.json()) || {}

            if (error) {
                toast.trigger({
                    message: error,
                    background: "bg-error-500",
                })
                return
            }
            data.products = [
                ...data.products,
                {
                    ...product,
                    units: data.units.find(({ id }) => id === product.units) || {},
                    brands: data.brands.find(({ id }) => id === product.brand) || {},
                    categories: data.categories.find(({ id }) => id === product.category) || {},
                    suppliers: data.suppliers.find(({ id }) => id === product.supplier) || {},
                },
            ]
            console.log(data.products)

            toast.trigger({
                message: "Produto criado com sucesso.",
            })
            selectedProduct = initialValue
            showModal = false
            loading = false
        } catch (error) {
            showModal = false
            console.log(error)
            if (error instanceof z.ZodError) {
                toast.trigger({
                    message: error.issues.map((issue) => issue.message).join("\n"),
                    background: "bg-error-500",
                })
                return
            }
        }
    }

    const handleAddUnit = async () => {
        const modalUnitSettings: ModalSettings = {
            type: "prompt",
            title: "Adicionar Unidade",
            body: "Digite o nome da unidade que deseja adicionar.",
            valueAttr: { type: "text", required: true, minlenght: 3 },
            buttonTextCancel: "Cancelar",
            buttonTextSubmit: "Adicionar",
            response: async (response) => {
                if (response && response.length > 3) {
                    try {
                        const res = await fetch(`/api/units`, {
                            method: "POST",
                            body: JSON.stringify({
                                name: response,
                                acronym: response.substring(0, 3).toLowerCase(),
                            }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                        const unit = (await res.json()) || {}
                        toast.trigger({
                            message: "Unidade criada com sucesso.",
                        })

                        invalidate("/registration/products")
                        data.units = [...data.units, unit]
                        unitsOptions = [...unitsOptions, unit]
                        selectedProduct.unit.id = unit.id
                        selectedProduct.unit.name = unit.name
                        showModal = true
                    } catch (error) {
                        console.log(error)
                        toast.trigger({
                            message: "Erro ao criar unidade, entre em contato com o suporte.",
                            background: "bg-error-500",
                        })
                    }
                } else {
                    showModal = true
                }
            },
        }
        showModal = false
        modal.trigger(modalUnitSettings)
    }

    const handleUnitSelect = (e: Event) => {
        const value = (e.target as HTMLSelectElement).value
        selectedProduct.unit.id = value
        selectedProduct.unit.name = data.units.find(({ id }) => id === value)?.name || ""
    }
</script>

<svelte:head>
    <title>SmartStockIt | Produtos</title>
</svelte:head>

<div id="reader" style="width:500px"></div>
<div class="flex flex-col gap-y-10 w-full h-full">
    <PageHeader title="Produtos">
        <Button
            slot="action"
            class="max-w-max"
            on:click={() => {
                selectedProduct = initialValue
                showModal = true
            }}>Criar Produto</Button>
        <div slot="search" class="w-full h-fit">
            <Input
                customClasses={{
                    wrapper: "w-full h-fit relative",
                    input: "rounded-e-none",
                }}
                placeholder="Pesquisar..."
                type="text"
                name="search"
                on:keypress={(e) => {
                    if (e.key === "Enter") {
                        handleSearch()
                    }
                }}
                bind:value={search}
                id="search">
                <button
                    slot="symbolRight"
                    class="dark:bg-surface-700 p-2 rounded-e-lg dark:hover:bg-surface-600 transition-colors duration-200 ease-in-out bg-surface-100 hover:bg-surface-300"
                    on:click={handleClearSearch}>
                    <X />
                </button>
                <Button
                    slot="action"
                    intent="secondary"
                    class="w-fit h-"
                    type="button"
                    loading={searchLoading}
                    on:click={handleSearch}>
                    <Search />
                </Button>
            </Input>
        </div>
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
                    { label: "Preço", key: "price", type: "currency" },
                    { label: "Custo", key: "cost", type: "currency" },
                    { label: "Categoria", key: "categories.name", type: "string" },
                    { label: "Marca", key: "brands.name", type: "string" },
                    { label: "Fornecedor", key: "suppliers.name", type: "string" },
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
    closeFunction={() => (selectedProduct = initialValue)}
    headerText={selectedProduct.id ? "Editar Produto" : "Adicionar Produto"}>
    <svelte:fragment slot="action">
        {#if selectedProduct.id}
            <IconButton on:click={handleDeleteClick} intent="secondary">
                <svelte:fragment slot="icon">
                    <Trash />
                </svelte:fragment>
            </IconButton>
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
            <div class="w-full flex gap-x-4">
                <Input
                    customClasses={{
                        wrapper: "w-full flex gap-x-4",
                        input: "rounded-s-none",
                    }}
                    label="Preço de Venda"
                    name="price"
                    disabled={selectedProduct.type === "raw"}
                    type="number"
                    id="price"
                    placeholder="10,00"
                    bind:value={selectedProduct.price}>
                    <Symbol slot="symbolLeft" text="R$" />
                </Input>
                <Input
                    customClasses={{
                        wrapper: "w-full flex gap-x-4",
                        input: "rounded-s-none",
                    }}
                    label="Preço de Custo"
                    name="cost"
                    type="number"
                    id="cost"
                    placeholder="8,00"
                    bind:value={selectedProduct.cost}>
                    <Symbol slot="symbolLeft" text="R$" />
                </Input>
            </div>
            <SelectSearch
                on:selection={(e) => {
                    if (e.detail.value === "") {
                        selectedProduct.brand.value = ""
                        selectedProduct.brand.label = ""
                        return
                    }
                    selectedProduct.brand.value = e.detail.value
                    selectedProduct.brand.label = e.detail.label
                }}
                on:input={(e) => handleSelectSearchInput(e, selectedProduct.brand.label)}
                label="Marca"
                name="brand"
                id="brand"
                required
                bind:inputValue={selectedProduct.brand.label}
                placeholder="Marca do Produto"
                options={brandsOptions}>
                <Button
                    slot="action"
                    on:click={handleAddBrand}
                    type="submit"
                    intent="secondary"
                    class="w-fit">
                    <Plus size={25} />
                </Button>
            </SelectSearch>
            <SelectSearch
                on:selection={(e) => {
                    selectedProduct.supplier.label = e.detail.label
                    selectedProduct.supplier.value = e.detail.value
                }}
                on:input={(e) => handleSelectSearchInput(e, selectedProduct.supplier.label)}
                label="Fornecedor"
                name="supplier"
                options={suppliersOptions}
                id="supplier"
                placeholder="Fornecedor"
                bind:inputValue={selectedProduct.supplier.label}>
                <Button
                    slot="action"
                    on:click={handleAddSupplier}
                    type="submit"
                    intent="secondary"
                    class="w-fit">
                    <Plus size={25} />
                </Button>
            </SelectSearch>
            <SelectSearch
                on:selection={(e) => {
                    selectedProduct.category.value = e.detail.value
                    selectedProduct.category.label = e.detail.label
                }}
                on:input={(e) => handleSelectSearchInput(e, selectedProduct.category.label)}
                label="Categoria"
                options={categoriesOptions}
                id="category"
                name="category"
                bind:inputValue={selectedProduct.category.label}
                placeholder="Categoria do Produto">
                <Button
                    slot="action"
                    on:click={handleAddCategory}
                    type="submit"
                    intent="secondary"
                    class="w-fit">
                    <Plus size={25} />
                </Button>
            </SelectSearch>
            <div class="flex w-1/2">
                <Input
                    label="Quantidade Inicial"
                    name="balance"
                    id="balance"
                    type="btn-number"
                    bind:value={selectedProduct.balance} />
            </div>
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
            <!-- <SelectSearch
                on:selection={(e) => {
                    selectedProduct.unit.value = e.detail.value
                    selectedProduct.unit.label = e.detail.label
                }}
                on:input={(e) => handleSelectSearchInput(e, selectedProduct.unit.label)}
                label="Unidade"
                options={unitsOptions.map((unit) => ({
                    label: unit.name,
                    value: unit.id,
                }))}
                id="unit"
                name="unit"
                bind:inputValue={selectedProduct.unit.label}
                placeholder="Unidade do Produto">
                <Button
                    slot="action"
                    on:click={handleAddUnit}
                    type="submit"
                    intent="secondary"
                    class="w-fit"
                    loading={false}
                    disabled={selectedProduct.unit.label === "" ||
                        selectedProduct.unit.value !== ""}>
                    <Plus size={25} />
                </Button>
            </SelectSearch> -->
            <Select
                label="Unidade"
                name="unit"
                on:change={handleUnitSelect}
                options={unitsOptions}
                value={selectedProduct.unit.id}
                id="unit">
                <Button
                    slot="action"
                    on:click={handleAddUnit}
                    type="submit"
                    intent="secondary"
                    class="w-fit">
                    <Plus size={25} />
                </Button>
            </Select>
            {#if selectedProduct}
                <input name="id" id="id" value={selectedProduct.id} type="hidden" />
            {/if}
            {#if selectedProduct.type === "product"}
                <Composition
                    bind:composition={selectedProduct.composition}
                    label="Composição"
                    options={compositionProducts} />
            {/if}
        </div>
        <div class="py-6 sm:py-0">
            <Button
                id="add_product"
                on:click={selectedProduct.id ? handleEditProduct : handleAddProductClick}
                {loading}>{selectedProduct.id ? "Editar" : "Adicionar"}</Button>
        </div>
    </div>
    <svelte:fragment slot="footer">
        <div />
    </svelte:fragment>
</Modal>
