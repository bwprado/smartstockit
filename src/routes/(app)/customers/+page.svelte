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
    import { Trash } from "lucide-svelte"
    import type { PageServerData } from "./$types"
    import type { Customer } from "../../../types/supabase"
    import { twMerge } from "tailwind-merge"
    import { string, z } from "zod"

    const toast = getToastStore()
    const modal = getModalStore()

    export let data: PageServerData

    let selectedCustomer: any = {
        name: "",
        email: "",
        phone: "",
        address: JSON.stringify({}) as unknown as JSON,
    }

    const CustomerValidation = z.object({
        name: z.string(),
        phone: z.coerce.number(),
        email: z.string().email().optional(),
        address: z.string().optional(),
    })

    $: showModal = false
    $: loading = false

    const handleRowClick = (id: string) => {
        selectedCustomer = data.customers.find((s) => s.id === id)
        showModal = true
    }

    const handleDeleteClick = async () => {
        showModal = false
        modal.trigger({
            type: "confirm",
            title: "Deletar Cliente",
            body: "Tem certeza que deseja deletar este cliente?",
            response: async (response) => {
                if (response) {
                    const res = await fetch("/api/customers", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id: selectedCustomer.id,
                        }),
                    })

                    const customer = await res.json()

                    if (res.status === 500) {
                        toast.trigger({
                            message: "Ocorreu um erro ao deletar o cliente.",
                            hideDismiss: true,
                        })

                        return
                    }

                    data.customers = data.customers.filter((c) => c.id !== customer.id)

                    toast.trigger({
                        message: "Cliente deletado com sucesso.",
                        hideDismiss: true,
                    })
                }
            },
        })
    }

    const handleSubmit = async () => {
        const validation = CustomerValidation.safeParse(selectedCustomer)

        if (!validation.success) {
            showModal = false
            toast.trigger({
                message: "Preencha todos os dados.",
                background: "bg-error-500",
            })
            return
        }

        loading = true

        if (selectedCustomer.id) {
            const res = await fetch(`/api/customers`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...selectedCustomer,
                }),
            })

            if (res.status !== 200) {
                toast.trigger({
                    message: "Ocorreu um erro ao modificar o cliente, tente novamente mais tarde.",
                })
                return
            }

            const updatedCustomer: Customer = await res.json()

            data.customers = data.customers.map((b) =>
                b.id === updatedCustomer.id ? updatedCustomer : b,
            )

            toast.trigger({
                message: "Cliente editado com sucesso.",
            })
        } else {
            const res = await fetch(`/api/customers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...selectedCustomer,
                }),
            })

            if (res.status === 500) {
                toast.trigger({
                    message: "Ocorreu um erro ao adicionar o cliente, tente novamente mais tarde.",
                })
                showModal = false
                loading = false
                return
            }

            const newCustomer: Customer = await res.json()

            data.customers = [...data.customers, newCustomer]

            toast.trigger({
                message: "Cliente adicionado com sucesso.",
            })
        }

        showModal = false
        loading = false
    }
</script>

<!-- <svelte:head>
    <script
        defer
        async
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBIF86zC1TH18sbTrMmGMjfIuhuuc02ra8&libraries=places&callback=initMap`}>
    </script>

    <script>
        function initMap() {
            const input = document.getElementById("autocomplete")
            const options = {
                componentRestrictions: { country: "us" },A 
                fields: ["address_components", "geometry", "icon", "name"],
                strictBounds: false,
                types: ["establishment"],
            }
            const autocomplete = new google.maps.places.Autocomplete(input, options)
        }
        onMount(() => {
            initMap()
        })
    </script>
</svelte:head> -->
<PageHeader title="Clientes">
    <Button
        class="max-w-max"
        on:click={() => {
            selectedCustomer = {
                name: "",
                email: "",
                phone: "",
                address: JSON.stringify({}),
            }
            showModal = true
        }}>Adicionar Cliente</Button>
</PageHeader>
<EmptyWrapper
    message="Você não possuí clientes cadastrados, para cadastrar, clique no botão acima."
    title="Nenhum cliente cadastrado ainda."
    length={data.customers.length}>
    <section class={twMerge("table-container", "rounded-lg")} slot="content">
        <Table
            columns={[
                { label: "Name", key: "name", type: "string" },
                { label: "Email", key: "email", type: "string" },
                { label: "Phone", key: "phone", type: "string" },
            ]}
            data={data.customers}
            {handleRowClick} />
    </section>
</EmptyWrapper>

<Modal
    bind:showModal
    position="right"
    headerText={selectedCustomer.id ? "Editar Cliente" : "Adicionar Cliente"}>
    <svelte:fragment slot="action">
        {#if selectedCustomer.id}
            <IconButton on:click={handleDeleteClick} intent="secondary">
                <svelte:fragment slot="icon">
                    <Trash />
                </svelte:fragment>
            </IconButton>
        {/if}
    </svelte:fragment>
    <div slot="body" class="grid grid-rows-[auto,max-content] w-full h-full gap-y-4">
        <div class="flex flex-col w-full gap-y-4">
            <Input
                label="Nome"
                name="name"
                required
                placeholder="Fulanda de Tal"
                bind:value={selectedCustomer.name}
                id="name"
                type="text" />
            <Input
                label="Celular"
                name="phone"
                placeholder="98 991150154"
                bind:value={selectedCustomer.phone}
                id="phone"
                type="phone" />
            <Input
                label="Email"
                name="email"
                placeholder="fulanadetal@gmail.com"
                bind:value={selectedCustomer.email}
                id="email"
                type="email" />
            <SelectSearch
                id="address"
                label="Endereço"
                name="address"
                options={[]}
                placeholder="Digite o endereço para pesquisar." />
        </div>
    </div>
    <svelte:fragment slot="footer">
        <div class="py-6 sm:py-0">
            <Button id="add_customer" on:click={handleSubmit} {loading}
                >{selectedCustomer.id ? "Editar" : "Adicionar"}</Button>
        </div>
    </svelte:fragment>
</Modal>
