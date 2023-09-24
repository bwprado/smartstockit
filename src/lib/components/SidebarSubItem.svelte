<script lang="ts">
    import { page } from "$app/stores"
    import { CornerDownRight } from "lucide-svelte"

    export let label: string
    export let link: string
    $: active = $page.url.pathname === link
</script>

<li>
    <a
        href={link}
        data-active={active}
        class="flex px-6 py-2 gap-x-4 text-surface-300 rounded-lg hover:text-secondary-500 data-[active=true]:text-secondary-500 data-[active=true]:font-bold">
        <span>{label}</span>
    </a>
</li>
