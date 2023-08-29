<script lang="ts">
    import { page } from "$app/stores"
    import { Avatar, LightSwitch, modeCurrent, setModeCurrent } from "@skeletonlabs/skeleton"
    export let session: any
    export let user: any
</script>

<header
    class="flex h-max w-full bg-primary-500 items-center text-gray-200 justify-between py-4 lg:px-28 px-4">
    <div class="">
        <a href="/">InventoryVT</a>
    </div>
    <nav class="align-middle">
        <ul class="flex gap-x-6 items-center">
            <li aria-current={$page.url.pathname.startsWith("/login")}>
                <a href={session ? "/logout" : "/login"}>{session ? "Logout" : "Login"}</a>
            </li>

            <LightSwitch on:click={() => setModeCurrent($modeCurrent ? true : false)} />
            <Avatar
                initials={user?.name}
                border="border-4 border-surface-300-600-token hover:!border-primary-500"
                width="w-12"
                cursor="cursor-pointer" />
        </ul>
    </nav>
</header>
