<script lang="ts">
    import Button from "./Button.svelte"

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
    dialog {
        max-width: 32em;
        border-radius: 0.2em;
        border: none;
        border-radius: 6px;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog > div {
        padding: 1em;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
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
    class="dark:bg-gray-800 bg-white rounded-md shadow-md px-4"
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => dialog.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        {#if $$slots.header}
            <slot name="header" />
        {:else}
            <div class="text-sm dark:text-gray-200 font-bold text-gray-900 p-2">{headerText}</div>
        {/if}
        <hr />
        <slot name="body" />
        <hr />
        {#if $$slots.footer}
            <slot name="footer" />
        {:else}
            <div class="flex w-full gap-x-4 py-4">
                <Button on:click={() => (showModal = false)}>Cancelar</Button>
                <Button
                    on:click={() => {
                        confirmFunction()
                        showModal = false
                    }}>Salvar</Button
                >
            </div>
        {/if}
        <!-- svelte-ignore a11y-autofocus -->
    </div>
</dialog>
