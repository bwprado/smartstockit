<script lang="ts">
    import { twMerge } from "tailwind-merge"

    let className: string = ""

    export { className as class }
</script>

<footer class={twMerge("text-surface-400 text-center text-xs flex flex-col gap-y-3", className)}>
    <p>&copy; 2023 <strong>Smart Stock It</strong>.</p>
    <p class="text-[10px]">
        Todos os direitos reservados para <strong>Working in Progress Dev</strong>.
    </p>
</footer>
