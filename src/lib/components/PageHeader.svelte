<script lang="ts">
    import { twMerge } from "tailwind-merge"

    let className: string = ""
    export { className as class }
    export let title: string = ""
</script>

<section class={twMerge("flex flex-col justify-between items-center gap-4", className)}>
    <div class="flex flex-row justify-between items-center gap-4 w-full">
        <div class="flex flex-col gap-2">
            <h1 class="text-lg sm:text-xl font-bold whitespace-nowrap">{title}</h1>
            <slot name="message" />
        </div>
        <slot name="action" />
    </div>
    {#if $$slots.search}
        <slot name="search" />
    {/if}
</section>
