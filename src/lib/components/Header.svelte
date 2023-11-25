<script lang="ts">
    import { page } from "$app/stores"
    import { Avatar, LightSwitch, modeCurrent, popup, setModeCurrent } from "@skeletonlabs/skeleton"
    import { Menu } from "lucide-svelte"
    import type { PopupSettings } from "@skeletonlabs/skeleton"
    import type { Session } from "@supabase/supabase-js"
    import type { Profile } from "../../types/supabase"

    import Button from "./Button.svelte"
    import Footer from "./Footer.svelte"
    import IconButton from "./IconButton.svelte"
    import MenuItems from "./MenuItems.svelte"
    import MobileSidebar from "./MobileSidebar.svelte"
    import Modal from "./Modal.svelte"

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
    class="flex h-max w-full items-center justify-between bg-primary-500 px-4 py-4 text-gray-200">
    <IconButton on:click={handleMenuClick} class="text-white dark:text-gray-200 lg:hidden">
        <svelte:fragment slot="icon">
            <Menu />
        </svelte:fragment>
    </IconButton>
    <div class="hidden sm:block">
        <a href="/" class="text-xl font-bold">
            <img
                src="https://vhjquurwdlkrfmaxfygm.supabase.co/storage/v1/object/public/images/smartstockit-logo-h.svg?t=2023-11-25T05%3A50%3A37.458Z"
                alt="SmartStockIt"
                width="200" />
        </a>
    </div>
    <nav class="align-middle">
        <ul class="flex items-center gap-x-6">
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
                            initials={profile?.name || "SN"}
                            border="border-4 border-surface-300-600-token hover:!border-white"
                            width="w-12"
                            cursor="cursor-pointer" />
                    </button>
                    <div class="card w-72 p-4 shadow-xl" data-popup="popupFeatured">
                        <div class="space-y-4">
                            <div class="flex items-center gap-x-2">
                                <Avatar
                                    initials={profile?.name || "SN"}
                                    border="border-4 border-surface-300-600-token hover:!border-primary-500"
                                    width="w-12"
                                    cursor="cursor-pointer" />
                                <p class="font-bold text-surface-900 dark:text-white">
                                    {profile?.name || "Sem Nome"}
                                </p>
                            </div>
                            <a
                                class="variant-soft btn w-full"
                                href="/logout"
                                target="_blank"
                                rel="noreferrer">
                                Logout
                            </a>
                        </div>
                        <div class="bg-surface-100-800-token arrow" />
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
                <MenuItems />
            </MobileSidebar>
        </svelte:fragment>
        <Footer class="mt-auto" slot="footer" />
    </Modal>
</header>
