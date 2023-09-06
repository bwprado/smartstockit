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

<style>
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog[open] {
        animation: move 0.5s cubic-bezier(0.34, 1.46, 0.74, 1);
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

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    class="dark:bg-suface-900 bg-white rounded-md shadow-md p-6 h-full right-0 mr-4 w-4/5 sm:w-1/3"
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => dialog.close()}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation class="flex flex-col relative h-full">
        <div class="grid grid-cols-[max-content,max-content] justify-between">
            <IconButton on:click={() => (showModal = false)} id="close-modal">
                <X
                    class="text-surface-800 dark:text-primary-500 hover:text-primary-500 dark:hover:text-gray-200" />
            </IconButton>
            <slot name="action" />
        </div>
        {#if $$slots.header}
            <slot name="header" />
        {:else}
            <div class="text-lg dark:text-gray-200 font-bold text-primary-500 py-4">
                {headerText}
            </div>
        {/if}
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
