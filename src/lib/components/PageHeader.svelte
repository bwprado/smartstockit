<script lang="ts">
    import { twMerge } from "tailwind-merge"

    let className: string = ""
    export { className as class }
    export let title: string = ""
</script>

<section class={twMerge("flex flex-row justify-between gap-4", className)}>
    <h1 class="text-lg sm:text-xl font-bold whitespace-nowrap">{title}</h1>
    <slot title="action" />
</section>
