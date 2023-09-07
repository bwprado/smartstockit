<script>
    import { twMerge } from "tailwind-merge"

    export let customClass = ""
</script>

<footer class={twMerge("text-surface-400 text-center text-xs flex flex-col gap-y-3", customClass)}>
    <p>&copy; 2023 <strong>Smart Stock It</strong>.</p>
    <p class="text-[10px]">
        Todos os direitos reservados para <strong>Working in Progress Dev</strong>.
    </p>
</footer>
