<script>
    import { twMerge } from "tailwind-merge"
</script>

<th scope="row" class={twMerge("px-4", "font-bold whitespace-nowrap table-cell")}>
    <slot />
</th>
