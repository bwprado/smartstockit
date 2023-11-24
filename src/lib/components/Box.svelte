<script lang="ts">
    export let title: string = "Smart Stock It"
</script>

<div class="flex flex-col gap-y-4 rounded-lg dark:bg-surface-800 bg-surface-100 p-6 border dark:border-surface-500 border-success-300">
    <h2 class="text-lg font-bold dark:text-white text-surface-900">{title}</h2>
    <slot />
</div>
