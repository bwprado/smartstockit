<script lang="ts">
    import Input from "$lib/components/Input.svelte"

    import { Tab, TabGroup } from "@skeletonlabs/skeleton"
    import type { PageServerData } from "./$types"

    export let data: PageServerData

    let tabSet: number = 0
</script>

<TabGroup>
    <Tab bind:group={tabSet} name="users" value={0}>
        <div class="text-sm flex flex-col items-center justify-center gap-y-2">
            <span>Perfil</span>
        </div>
    </Tab>
    <svelte:fragment slot="panel">
        {#if tabSet === 0}
            <h1 class="text-xl font-bold whitespace-nowrap pt-6">Perfil da Empresa</h1>
            <div class="grid grid-cols-flow sm:grid-cols-2 grid-flow-row gap-4">
                <Input
                    id="name"
                    name="name"
                    label="Nome"
                    type="text"
                    value={data?.user?.name || ""} />
                <Input
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={data?.user?.email || ""} />
                <Input
                    id="phone"
                    name="phone"
                    label="Telefone"
                    type="text"
                    value={data?.user?.phone || ""} />
                <Input
                    id="company"
                    name="company"
                    label="Empresa"
                    type="text"
                    value={data?.user?.company || ""} />
            </div>
        {:else if tabSet === 1}
            <div>In development</div>
        {:else if tabSet === 2}
            (tab panel 3 contents)
        {/if}
    </svelte:fragment>
</TabGroup>
