<script lang="ts">
    import { cva } from "class-variance-authority"
    import { X } from "lucide-svelte"
    import Button from "./Button.svelte"
    import IconButton from "./IconButton.svelte"
    import { fade } from "svelte/transition"

    export let showModal: boolean
    export let confirmFunction: () => void
    export let headerText: string = ""
    export let position: "right" | "left" | "top" | "bottom" | "center" = "right"

    let dialog: HTMLDialogElement

    $: if (dialog && showModal) {
        dialog.showModal()
    } else if (dialog && !showModal) {
        dialog.close()
    }

    const dialogStyle = cva(
        [
            "dark:bg-surface-800",
            "backdrop:bg-[rgba(0,0,0,0.4)]",
            "bg-white",
            "sm:rounded-s-md",
            "shadow-md",
            "p-6",
            "h-full",
            "max-h-full",
            "w-full",
            "max-w-full",
            "sm:w-2/3",
            "md:w-1/2",
            "lg:w-2/5",
            "overflow-y-auto",
            "overflow-x-hidden",
        ],
        {
            variants: {
                position: {
                    top: "top-0",
                    center: "top-1/2",
                    bottom: "bottom-0",
                    left: "ml-0 open:animate-modal-left",
                    right: "mr-0 open:animate-modal-right",
                },
            },
        },
    )
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    class={dialogStyle({ position })}
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => {
        console.log('Aqiio')
        dialog.close()
    }}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation class="flex flex-col relative h-full">
        <div
            class="grid grid-cols-[max-content,auto,max-content] justify-between h-fit pb-4 items-center border-b border-surface-50 dark:border-surface-500 mb-8">
            <IconButton on:click={() => (showModal = false)} id="close-modal" intent="secondary">
                <svelte:fragment slot="icon">
                    <X />
                </svelte:fragment>
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
