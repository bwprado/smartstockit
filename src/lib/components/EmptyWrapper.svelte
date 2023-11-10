<script lang="ts">
    import { EqualNot } from "lucide-svelte"

    export let title: string = "Não encontrado"
    export let message: string = ""
    export let length: number = 0
</script>

{#if length === 0}
    <div
        class="flex flex-col items-center justify-center w-full h-1/2 border rounded-lg border-surface-300 dark:border-surface-700 p-10">
        <div class="flex flex-col items-center justify-center gap-4 px-6">
            <div class="flex gap-x-4 text-surface-700 dark:text-surface-200">
                <EqualNot />
                <h1 class="text-lg font-bold text-surface-800 dark:text-surface-200">{title}</h1>
            </div>
            <p class="text-sm text-surface-700 dark:text-surface-200">{message}</p>
            <slot name="action" />
        </div>
    </div>
{:else}
    <slot name="content" />
{/if}
