<script lang="ts">
    import { EqualNot } from "lucide-svelte"

    export let title: string = "Não encontrado"
    export let message: string = ""
    export let length: number = 0
</script>

{#if length === 0}
    <div
        class="flex flex-col items-center justify-center w-full h-1/2 border rounded-lg border-surface-700 p-10">
        <div class="flex flex-col items-center justify-center gap-4">
            <div class="flex gap-x-4">
                <EqualNot />
                <h1 class="text-xl font-bold text-surface-200">{title}</h1>
            </div>
            <p class="text-base text-surface-200">{message}</p>
            <slot name="action" />
        </div>
    </div>
{:else}
    <slot name="content" />
{/if}
