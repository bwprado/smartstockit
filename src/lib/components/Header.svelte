<script lang="ts">
    import { page } from "$app/stores"
    import type { PopupSettings } from "@skeletonlabs/skeleton"
    import { Avatar, LightSwitch, modeCurrent, popup, setModeCurrent } from "@skeletonlabs/skeleton"
    import type { Session } from "@supabase/supabase-js"
    import { ArrowDown, ArrowUp, Box, LayoutDashboard, Menu, Settings } from "lucide-svelte"
    import type { Profile } from "../../types/supabase"
    import Button from "./Button.svelte"
    import Footer from "./Footer.svelte"
    import IconButton from "./IconButton.svelte"
    import MobileSidebar from "./MobileSidebar.svelte"
    import Modal from "./Modal.svelte"
    import SidebarItem from "./SidebarItem.svelte"

    export let profile: Profile
    export let session: Session

    const popupFeatured: PopupSettings = {
        event: "click",
        target: "popupFeatured",
        placement: "bottom",
    }
    $: showModal = false

    const handleMenuClick = () => {
        showModal = true
    }
</script>

<header
    class="flex h-max w-full bg-primary-500 items-center text-gray-200 justify-between py-4 px-4">
    <IconButton on:click={handleMenuClick} class="dark:text-gray-200 text-white lg:hidden">
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
    <Modal
        bind:showModal
        headerText="Menu"
        confirmFunction={() => console.log("Test")}
        position="left">
        <svelte:fragment slot="body">
            <MobileSidebar>
                <SidebarItem label="Configurações" link="/settings">
                    <Settings size={20} />
                </SidebarItem>
                <SidebarItem label="Dashboard" link="/dashboard">
                    <LayoutDashboard size={20} />
                </SidebarItem>
                <SidebarItem label="Produtos" link="/products">
                    <Box size={20} />
                </SidebarItem>
                <SidebarItem label="Entradas" link="/input">
                    <ArrowUp size={20} />
                </SidebarItem>
                <SidebarItem label="Saídas" link="/output">
                    <ArrowDown size={20} />
                </SidebarItem>
            </MobileSidebar>
        </svelte:fragment>
        <Footer class="mt-auto" slot="footer" />
    </Modal>
</header>
