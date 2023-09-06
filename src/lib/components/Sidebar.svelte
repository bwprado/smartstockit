<script lang="ts">
    import { page } from "$app/stores"
    import { cva } from "class-variance-authority"
    import type { SvelteComponent } from "svelte"

    export let navItems: { label: string; link: string; Icon: SvelteComponent }[] = []
    $: active = $page.url.pathname
    const linkStyle = cva(
        [
            "py-2",
            "px-6",
            "hover:bg-primary-500",
            "rounded-lg",
            "flex",
            "items-center",
            "gap-x-4",
            "hover:text-primary-50",
        ],
        {
            variants: {
                active: {
                    true: ["font-bold", "bg-primary-500"],
                    false: "font-medium",
                },
            },
        },
    )
</script>

<nav class="h-full w-0 sm:w-60 transition-all duration-300 my-auto p-2 sm:p-8">
    <ul class="flex-col gap-y-4 hidden sm:flex">
        {#each navItems as { link, label, Icon }}
            <a href={link}>
                <li class={linkStyle({ active: active === link })}>
                    <svelte:component this={Icon} />
                    <span>{label}</span>
                </li>
            </a>
        {/each}
    </ul>
</nav>
