<script lang="ts">
    import { page } from "$app/stores"
    import type { ModalSettings, ModalStore, PopupSettings } from "@skeletonlabs/skeleton"
    import {
        Avatar,
        LightSwitch,
        getModalStore,
        modeCurrent,
        popup,
        setModeCurrent,
    } from "@skeletonlabs/skeleton"
    import { ArrowDown, ArrowUp, LayoutDashboard, Menu, Package, Settings } from "lucide-svelte"
    import Button from "./Button.svelte"
    import IconButton from "./IconButton.svelte"
    import MobileSidebar from "./MobileSidebar.svelte"
    import type { LayoutServerData, PageData } from "../../routes/$types"
    import type { Session } from "@supabase/supabase-js"
    import type { Profile } from "../../types/supabase"

    const popupFeatured: PopupSettings = {
        event: "click",
        target: "popupFeatured",
        placement: "bottom",
    }

    const modalStore: ModalStore = getModalStore()
    const modalSettings: ModalSettings = {
        position: "items-start h-full",
        title: "Menu",
        type: "component",
        component: {
            ref: MobileSidebar,
            props: {
                navItems: [
                    { label: "Configurações", link: "/settings", Icon: Settings },
                    { label: "Dashboard", link: "/dashboard", Icon: LayoutDashboard },
                    { label: "Produtos", link: "/products", Icon: Package },
                    { label: "Entradas", link: "/input", Icon: ArrowUp },
                    { label: "Saídas", link: "/output", Icon: ArrowDown },
                ],
                onClick: () => modalStore.close(),
            },
        },
    }

    const handleMenuClick = () => {
        modalStore.trigger(modalSettings)
    }
    export let profile: Profile
    export let session: Session
</script>

<header
    class="flex h-max w-full bg-primary-500 items-center text-gray-200 justify-between py-4 px-4">
    <IconButton on:click={handleMenuClick} customClasses="dark:text-gray-200 text-white lg:hidden">
        <Menu />
    </IconButton>
    <div class="hidden sm:block">
        <a href="/" class="text-xl font-bold">Smart Stock It</a>
    </div>
    <nav class="align-middle">
        <ul class="flex gap-x-6 items-center">
            <LightSwitch on:click={() => setModeCurrent($modeCurrent ? true : false)} />
            {#if !session}
                <li aria-current={$page.url.pathname.startsWith("/login")}>
                    <a href="/login">
                        <Button id="login" intent="secondary">Login</Button>
                    </a>
                </li>
            {:else}
                <li>
                    <button class="" use:popup={popupFeatured}>
                        <Avatar
                            initials={profile?.name}
                            border="border-4 border-surface-300-600-token hover:!border-white"
                            width="w-12"
                            cursor="cursor-pointer" />
                    </button>
                    <div class="card p-4 w-72 shadow-xl" data-popup="popupFeatured">
                        <div class="space-y-4">
                            <div class="flex gap-x-2 items-center">
                                <Avatar
                                    initials={profile?.name}
                                    border="border-4 border-surface-300-600-token hover:!border-primary-500"
                                    width="w-12"
                                    cursor="cursor-pointer" />
                                <p class="font-bold">{profile?.name}</p>
                            </div>
                            <a
                                class="btn variant-soft w-full"
                                href="/logout"
                                target="_blank"
                                rel="noreferrer">
                                Logout
                            </a>
                        </div>
                        <div class="arrow bg-surface-100-800-token" />
                    </div>
                </li>
            {/if}
        </ul>
    </nav>
</header>
