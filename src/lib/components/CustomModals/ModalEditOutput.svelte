<script lang="ts">
    import { getModalStore } from "@skeletonlabs/skeleton"
    import Input from "../Input.svelte"
    import Button from "../Button.svelte"
    import IconButton from "../IconButton.svelte"
    import { Trash } from "lucide-svelte"

    const modalStore = getModalStore()

    const product = $modalStore[0].meta.product
    const closeFunction = $modalStore[0].meta.closeFunction
    const removeFunction = $modalStore[0].meta.removeFunction

    const formData = {
        name: product.productName,
        amount: +product.amount,
        id: product.id,
    }

    function onFormSubmit(): void {
        if ($modalStore[0].response) $modalStore[0].response(formData)
        modalStore.close()
    }
</script>

{#if $modalStore[0]}
    <div class="bg-surface-900 p-10 rounded-lg flex items-center gap-10">
        <div class="flex flex-col gap-10">
            <div class="flex items-center justify-between">
                <h1 class="h4 font-semibold">Editar Saída do Estoque</h1>
                <IconButton on:click={removeFunction} intent="secondary">
                    <svelte:fragment slot="icon">
                        <Trash />
                    </svelte:fragment>
                </IconButton>
            </div>
            <form class="flex flex-col gap-6">
                <Input name="name" id="name" value={formData.name} label="Nome" disabled />
                <Input
                    name="amout"
                    id="amount"
                    type="btn-number"
                    bind:value={formData.amount}
                    label="Quantidade" />
                <div class="flex gap-4 w-full">
                    <Button type="button" intent="secondary" on:click={() => closeFunction()}
                        >Cancelar</Button>
                    <Button type="submit" intent="primary" on:click={onFormSubmit}>Salvar</Button>
                </div>
            </form>
        </div>
    </div>
{/if}
