<script lang="ts">
    import { page } from "$app/stores"
    import type { PopupSettings } from "@skeletonlabs/skeleton"
    import {
        Avatar,
        LightSwitch,
        getModalStore,
        modeCurrent,
        popup,
        setModeCurrent,
    } from "@skeletonlabs/skeleton"
    import { ArrowDown, ArrowUp, Home, LayoutDashboard, Menu, Package, Settings } from "lucide-svelte"
    import Button from "./Button.svelte"
    import IconButton from "./IconButton.svelte"
    import MobileSidebar from "./MobileSidebar.svelte"
    import type { ModalSettings, ModalComponent, ModalStore } from "@skeletonlabs/skeleton"

    export let user: any
    export let session: any

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
                navItems:[
                    { label: "Home", link: "/", Icon: Home },
                    { label: "Admin", link: "/admin", Icon: Settings },
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
</script>

<header
    class="flex h-max w-full bg-primary-500 items-center text-gray-200 justify-between py-4 lg:px-28 px-4"
>
    <div class="hidden sm:block">
        <a href="/">Inventory</a>
    </div>
    <IconButton on:click={handleMenuClick} customClasses="dark:text-gray-200 text-white sm:hidden">
        <Menu />
    </IconButton>
    <nav class="align-middle">
        <ul class="flex gap-x-6 items-center">
            <LightSwitch on:click={() => setModeCurrent($modeCurrent ? true : false)} />
            {#if !user}
                <li aria-current={$page.url.pathname.startsWith("/login")}>
                    <a href="/login">
                        <Button id="login" intent="secondary">Login</Button>
                    </a>
                </li>
            {/if}

            {#if user}
                <li>
                    <button class="" use:popup={popupFeatured}>
                        <Avatar
                            initials={user?.name}
                            border="border-4 border-surface-300-600-token hover:!border-white"
                            width="w-12"
                            cursor="cursor-pointer"
                        />
                    </button>
                    <div class="card p-4 w-72 shadow-xl" data-popup="popupFeatured">
                        <div class="space-y-4">
                            <div class="flex gap-x-2 items-center">
                                <Avatar
                                    initials={user?.name}
                                    border="border-4 border-surface-300-600-token hover:!border-primary-500"
                                    width="w-12"
                                    cursor="cursor-pointer"
                                />
                                <p class="font-bold">{user?.name}</p>
                            </div>
                            <a
                                class="btn variant-soft w-full"
                                href="/logout"
                                target="_blank"
                                rel="noreferrer"
                            >
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
