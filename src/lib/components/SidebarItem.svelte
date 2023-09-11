<script lang="ts">
    import { page } from "$app/stores"
    import { cva } from "class-variance-authority"

    export let label: string = ""
    export let link: string = ""
    export let active: boolean = false

    const linkStyle = cva(
        [
            "py-2",
            "px-4",
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

<a href={link} class="w-full">
    <li class={linkStyle({ active: $page.url.pathname === link })}>
        <div class="w-fit text-surface-900 dark:text-white">
            <slot />
        </div>
        <span class="text-surface-900 dark:text-white">{label}</span>
    </li>
</a>
