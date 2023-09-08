<script lang="ts">
    import { page } from "$app/stores"
    import { cva } from "class-variance-authority"
    import IconButton from "./IconButton.svelte"
    import { X } from "lucide-svelte"
    import Footer from "./Footer.svelte"

    export let navItems: { label: string; link: string }[] = []
    export let onClick: () => void = () => {}

    $: active = $page.url.pathname
    const linkStyle = cva(
        [
            "py-2",
            "px-6",
            "hover:bg-primary-500",
            "rounded-lg",
            "flex",
            "items-center",
            "hover:text-primary-50",
        ],
        {
            variants: {
                active: {
                    true: ["font-bold", "bg-primary-500", "text-white"],
                    false: "font-medium",
                },
            },
        },
    )
</script>

<nav
    class="bg-gray-200 dark:bg-surface-800 h-full flex flex-col gap-y-20 w-full transition-all duration-300 p-8 rounded-lg">
    <div class="flex items-center justify-between">
        <h1 class="text-primary-500 text-2xl font-bold">Smart Stock It</h1>
        <IconButton on:click={onClick}>
            <X />
        </IconButton>
    </div>
    <ul class="flex-col gap-y-4 flex">
        {#each navItems as { link, label }}
            <a href={link} on:click={onClick}>
                <li class={linkStyle({ active: active === link })}>
                    {label}
                </li>
            </a>
        {/each}
    </ul>
    <Footer customClass="mt-auto" />
</nav>
