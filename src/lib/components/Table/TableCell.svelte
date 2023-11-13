<script lang="ts">
    import { twMerge } from "tailwind-merge"

    export let customClass: string = ""
</script>

<td class={twMerge("table-cell", customClass, "!px-4 !align-middle")}>
    <slot />
</td>
