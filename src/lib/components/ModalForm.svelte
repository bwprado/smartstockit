<script lang="ts">
    import { getModalStore } from "@skeletonlabs/skeleton"
    import Button from "./Button.svelte"

    export let formData: any

    const modalStore = getModalStore()

    function onFormSubmit(e: SubmitEvent): void {
        e.preventDefault()
        if ($modalStore[0].response) {
            console.log(formData)
            $modalStore[0].response(formData)
        }
        modalStore.close()
    }
</script>

{#if $modalStore[0]}
    <form class="p-8 bg-surface-500 rounded-md" on:submit={onFormSubmit}>
        <slot />
        <div class="flex gap-4 w-full">
            <Button type="button" intent="secondary" class="" on:click={modalStore.close}
                >Cancelar</Button>
            <Button type="submit" intent="primary" class="">Salvar</Button>
        </div>
    </form>
{/if}
