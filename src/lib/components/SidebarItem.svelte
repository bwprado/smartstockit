<script lang="ts">
    import { page } from "$app/stores"
    import { cva } from "class-variance-authority"
    import { ChevronDown } from "lucide-svelte"
    import { slide } from "svelte/transition"

    export let label: string = ""
    export let link: string = ""
    export let expanded: boolean = false

    const linkStyle = cva(
        [
            "py-2",
            "px-4",
            "gap-x-4",
            "hover:bg-primary-500",
            "hover:text-primary-50",
            "rounded-lg",
            "flex",
            "items-center",
            "justify-between",
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

    const chevronStyle = cva(
        ["w-fit", "text-surface-900", "dark:text-white", "transition-transform"],
        {
            variants: {
                open: {
                    true: "transform -rotate-180",
                    false: "transform -rotate-0",
                },
            },
        },
    )
</script>

<button on:click={$$slots.subitem ? () => (expanded = !expanded) : () => {}}>
    <a href={$$slots.subitem ? undefined : link} class="w-full">
        <li class={linkStyle({ active: $page.url.pathname === link })}>
            <div class="flex gap-x-6">
                <div
                    class="w-fit text-surface-900 dark:text-white data-[active=true]:text-white"
                    data-active={$page.url.pathname === link}>
                    <slot name="icon" />
                </div>
                <span
                    class="text-surface-900 dark:text-white data-[active=true]:text-white"
                    data-active={$page.url.pathname === link}>{label}</span>
            </div>
            {#if $$slots.subitem}
                <ChevronDown size={20} class={chevronStyle({ open: expanded })} />
            {/if}
        </li>
    </a>
</button>
{#if $$slots.subitem && expanded}
    <div
        transition:slide={{
            axis: "y",
            duration: 200,
        }}>
        <slot name="subitem" />
    </div>
{/if}
