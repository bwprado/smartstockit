<script lang="ts">
    import { page } from "$app/stores"
    import { cx } from "class-variance-authority"

    export let label: string
    export let link: string
    $: active = $page.url.pathname === link
    const style = cx([
        "flex",
        "px-6",
        "py-2",
        "gap-x-4",
        "text-surface-400",
        "dark:text-surface-300",
        "rounded-lg",
        "hover:text-secondary-500",
        "data-[active=true]:dark:text-primary-500",
        "data-[active=true]:text-primary-500",
        "data-[active=true]:font-bold",
    ])
</script>

<li>
    <a href={link} data-active={active} class={style}>
        <span>{label}</span>
    </a>
</li>
