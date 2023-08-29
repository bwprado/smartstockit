<script lang="ts">
    import { page } from "$app/stores"
    import { cva } from "class-variance-authority"

    export let navItems: { label: string; link: string }[] = []
    $: active = $page.url.pathname
    const linkStyle = cva(
        ["py-2", "px-6", "hover:bg-primary-500", "rounded-lg", "flex", "items-center", 'hover:text-primary-50'],
        {
            variants: {
                active: {
                    true: ["font-bold", 'bg-primary-500'],
                    false: "font-medium",
                },
            },
        },
    )
</script>

<nav class="h-full w-60 my-auto p-8">
    <ul class="flex flex-col gap-y-4">
        {#each navItems as { link, label }}
            <li class={linkStyle({ active: active === link })}>
                <a href={link}>{label}</a>
            </li>
        {/each}
    </ul>
</nav>
