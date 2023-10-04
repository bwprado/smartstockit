<script lang="ts">
    import Input from "$lib/components/Input.svelte"

    import { Tab, TabGroup, getToastStore } from "@skeletonlabs/skeleton"
    import type { ActionData, PageServerData } from "./$types"
    import Button from "$lib/components/Button.svelte"
    import { enhance } from "$app/forms"
    import type { SubmitFunction } from "@sveltejs/kit"

    const toast = getToastStore()

    export let data: PageServerData
    export let form: ActionData

    $: loading = false
    let tabSet: number = 0

    const handleSubmit: SubmitFunction = async ({}) => {
        loading = true
        return async ({ update }) => {
            await update()
            loading = false
        }
    }

    if (form && form?.status === 200) {
        toast.trigger({
            message: "Usuário atualizado com sucesso!",
        })
        data.user = form?.data
    } else if (form && form?.status !== 200) {
        const message =
            form?.status === 401
                ? "Você não está autorizado a realizar esta ação!"
                : "Ocorreu um erro ao atualizar o usuário!"
        toast.trigger({
            message,
            background: "bg-error-500",
        })
    }
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
            <form
                method="post"
                action="?/edit"
                class="flex flex-col gap-10 h-full"
                use:enhance={handleSubmit}>
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
                    <input type="hidden" name="id" value={data?.user?.id} />
                </div>
                <Button type="submit" {loading} class="sm:w-1/3 sm:self-end mt-auto">Salvar</Button>
            </form>
        {:else if tabSet === 1}
            <div>In development</div>
        {:else if tabSet === 2}
            (tab panel 3 contents)
        {/if}
    </svelte:fragment>
</TabGroup>
