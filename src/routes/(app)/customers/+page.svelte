<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import EmptyWrapper from "$lib/components/EmptyWrapper.svelte"
    import IconButton from "$lib/components/IconButton.svelte"
    import Input from "$lib/components/Input.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import PageHeader from "$lib/components/PageHeader.svelte"
    import SelectSearch from "$lib/components/SelectSearch.svelte"
    import Table from "$lib/components/Table/Table.svelte"
    import { getToastStore } from "@skeletonlabs/skeleton"
    import { Trash } from "lucide-svelte"

    const toast = getToastStore()

    let selectedCustomer: any = {}

    $: showModal = false

    const handleDeleteClick = async () => {
        try {
            const res = await fetch(`?/deleteUser/${selectedCustomer.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const customer = await res.json()

            console.log(customer)
        } catch (error) {
            console.log(error)
            toast.trigger({
                message: "Ocorreu um erro ao deletar o cliente.",
                hideDismiss: true,
            })
        }
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
            selectedCustomer = {}
            showModal = true
        }}>Adicionar Cliente</Button>
</PageHeader>
<EmptyWrapper
    message="Você não possuí clientes cadastrados, para cadastrar, clique no botão acima."
    title="Nenhum cliente cadastrado ainda.">
    <Table
        columns={[
            { label: "Name", key: "name", type: "string" },
            { label: "Email", key: "email", type: "string" },
        ]} />
</EmptyWrapper>

<Modal showModal={true} position="right" headerText="Adicionar Cliente">
    <svelte:fragment slot="action">
        {#if selectedCustomer.id}
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
        <form method="POST" action="?/newCustomer" class="flex flex-col w-full gap-y-4">
            {selectedCustomer?.name}
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
        </form>
    </div>
</Modal>
