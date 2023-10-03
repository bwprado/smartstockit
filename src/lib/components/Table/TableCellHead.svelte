<script>
    import { twMerge } from "tailwind-merge"
</script>

<th scope="row" class={twMerge("p-4", "font-bold whitespace-nowrap table-cell text-xs")}>
    <slot />
</th>
