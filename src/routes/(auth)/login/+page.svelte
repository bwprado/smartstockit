<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import Input from "$lib/components/Input.svelte"
    import { getToastStore } from "@skeletonlabs/skeleton"
    import type { ActionData } from "./$types.js"
    import Footer from "$lib/components/Footer.svelte"
    import { page } from "$app/stores"

    const toastStore = getToastStore()

    export let form: ActionData

    if (form?.status === 400) {
        toastStore.trigger({
            message: form?.body,
            background: "bg-error-500",
        })
    }

    // async function handleSignInWithGoogle(response: any) {
    //     const { data, error } = await $page.supabase.auth.signInWithIdToken({
    //         token: response.credential,
    //         nonce: "NONCE", // must be the same one as provided in data-nonce (if any)
    //     })
    // }
</script>

<div
    class="grid grid-rows-3 w-screen h-screen overflow-hidden items-center justify-center hero-gradient">
    <div></div>
    <div
        class="w-[350px] sm:w-[500px] items-center flex flex-col gap-y-6 justify-center rounded-lg border dark:border-surface-500 bg-surface-800 p-10 sm:p-20">
        <form
            method="post"
            action="?/email-password"
            class="flex flex-col gap-y-6 items-center justify-center w-full">
            <h1 class="font-bold text-2xl">Smart Stock It</h1>
            <p class="font-bold">Login</p>
            <Input id="email" name="email" label="Email" type="text" />
            <Input id="password" name="password" label="Password" type="password" />
            <Button type="submit" id="login">Login</Button>
            <div
                class="grid grid-cols-[1fr,max-content,1fr] items-center justify-center w-full gap-x-4">
                <div class="border-b-[1px] border-surface-400" />
                <p class="uppercase text-xs text-surface-400">ou continue com</p>
                <div class="border-b-[1px] border-surface-400" />
            </div>
        </form>
        <form action="?/google" class="w-full" method="post">
            <button
                type="submit"
                class="flex items-center justify-center bg-surface-900 rounded-lg border border-scale-500 hover:bg-secondary-500/10 transition w-full h-10">
                <div
                    class="relative flex items-center justify-center shrink-0 h-10 w-10 rounded-lg group overflow-hidden transition">
                    <img
                        class="w-5"
                        src="https://supabase.com/docs/img/icons/google-icon.svg"
                        alt="Google Icon" />
                </div>
                <h5 class="text-base text-scale-1200 px-4">Google</h5>
                <div
                    id="g_id_onload"
                    data-client_id="<client ID>"
                    data-context="signin"
                    data-ux_mode="popup"
                    data-callback="handleSignInWithGoogle"
                    data-nonce=""
                    data-auto_select="true"
                    data-itp_support="true">
                </div>

                <div
                    class="g_id_signin"
                    data-type="standard"
                    data-shape="pill"
                    data-theme="outline"
                    data-text="signin_with"
                    data-size="large"
                    data-logo_alignment="left">
                </div>
            </button>
        </form>
    </div>
</div>
