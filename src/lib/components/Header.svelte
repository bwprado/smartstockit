<script lang="ts">
    import { page } from "$app/stores"
    import { Avatar, LightSwitch, modeCurrent, setModeCurrent } from "@skeletonlabs/skeleton"
    import Button from "./Button.svelte"
    export let session: any
    export let user: any
</script>

<header
    class="flex h-max w-full bg-primary-500 items-center text-gray-200 justify-between py-4 lg:px-28 px-4"
>
    <div class="">
        <a href="/">InventoryVT</a>
    </div>
    <nav class="align-middle">
        <ul class="flex gap-x-6 items-center">
            <LightSwitch on:click={() => setModeCurrent($modeCurrent ? true : false)} />
            <li aria-current={$page.url.pathname.startsWith("/login")}>
                <a href={session ? "/logout" : "/login"}
                    ><Button id="login" intent="secondary">{session ? "Logout" : "Login"}</Button></a
                >
            </li>

            {#if user}
                <Avatar
                    initials={user?.name}
                    border="border-4 border-surface-300-600-token hover:!border-primary-500"
                    width="w-12"
                    cursor="cursor-pointer"
                />
            {/if}
        </ul>
    </nav>
</header>
