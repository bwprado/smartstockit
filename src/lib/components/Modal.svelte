<script lang="ts">
    import { X } from "lucide-svelte"
    import Button from "./Button.svelte"
    import IconButton from "./IconButton.svelte"

    export let showModal: boolean
    export let confirmFunction: () => void
    export let headerText: string = ""

    let dialog: HTMLDialogElement

    $: if (dialog && showModal) {
        dialog.showModal()
    } else if (dialog && !showModal) {
        dialog.close()
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    class="dark:bg-surface-800 bg-white rounded-md shadow-md p-6 h-full right-0 mr-4 w-full sm:w-2/3 md:w-1/2 lg:w-2/5"
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => dialog.close()}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation class="flex flex-col relative h-full">
        <div
            class="grid grid-cols-[max-content,auto,max-content] justify-between h-fit pb-4 items-center border-b border-surface-50 dark:border-surface-500 mb-8">
            <IconButton on:click={() => (showModal = false)} id="close-modal" intent="secondary">
                <X
                    class="text-surface-800 dark:text-primary-500" />
            </IconButton>
            {#if $$slots.header}
                <slot name="header" />
            {:else}
                <div class="text-lg dark:text-gray-200 font-bold text-primary-500">
                    {headerText}
                </div>
            {/if}
            <slot name="action" />
        </div>
        <div class="h-full">
            <slot name="body" />
        </div>
        {#if $$slots.footer}
            <div class="w-full">
                <slot name="footer" />
            </div>
        {:else}
            <div class="flex w-full gap-x-4 py-4">
                <Button on:click={() => (showModal = false)}>Cancelar</Button>
                <Button
                    on:click={() => {
                        confirmFunction()
                        showModal = false
                    }}>Salvar</Button>
            </div>
        {/if}
        <!-- svelte-ignore a11y-autofocus -->
    </div>
</dialog>

<style>
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog[open] {
        animation: move 0.3s cubic-bezier(0.34, 1.4, 0.84, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }

    @keyframes move {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
