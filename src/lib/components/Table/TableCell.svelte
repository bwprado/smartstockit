<script lang="ts">
    import { twMerge } from "tailwind-merge"

    export let customClass: string = ""
</script>

<td class={twMerge("px-4", "table-cell", customClass)}>
    <slot />
</td>
