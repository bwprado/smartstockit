<script lang="ts">
    import { enhance } from "$app/forms"
    import Button from "$lib/components/Button.svelte"
    import Input from "$lib/components/Input.svelte"
    import { ProgressRadial, getModalStore } from "@skeletonlabs/skeleton"
    import type { SubmitFunction } from "@sveltejs/kit"

    const modal = getModalStore()

    const handleSubmit: SubmitFunction = async () => {
        modal.trigger({
            type: "alert",
            title: "Carregando",
            body: "Carregando SmartStockIt, por favor aguarde...",
        })
        return async ({ update }) => {
            await update()
        }
    }
</script>

<div
    class="grid grid-rows-3 w-screen h-screen overflow-hidden items-center justify-center hero-gradient">
    <div></div>
    <div
        class="w-[300px] sm:w-[500px] items-center flex flex-col gap-y-6 justify-center rounded-lg border dark:border-surface-500 bg-surface-800 p-10 sm:p-20">
        <form
            method="post"
            class="flex flex-col gap-y-4 items-center justify-center w-full"
            use:enhance={handleSubmit}>
            <h1 class="font-bold text-2xl">Smart Stock It</h1>
            <p class="font-bold">Login</p>
            <Input id="email" name="email" label="Email" type="email" />
            <Input id="password" name="password" label="Password" type="password" />
            <Button type="submit" id="login">Login</Button>
            <div
                class="grid grid-cols-[1fr,max-content,1fr] items-center justify-center w-full gap-x-4">
                <div class="border-b-[1px] border-surface-400" />
                <p class="uppercase text-[10px] text-surface-400">ou continue com</p>
                <div class="border-b-[1px] border-surface-400" />
            </div>
            <button
                type="submit"
                formaction="?provider=google"
                class="flex items-center justify-center bg-surface-900 rounded-lg border border-scale-500 hover:bg-secondary-500/10 transition w-full h-10">
                <div
                    class="relative flex items-center justify-center shrink-0 h-10 w-10 rounded-lg group overflow-hidden transition">
                    <img
                        class="w-5"
                        src="https://supabase.com/docs/img/icons/google-icon.svg"
                        alt="Google Icon" />
                </div>
                <h5 class="text-base text-scale-1200 px-4">Google</h5>
            </button>
        </form>
    </div>
</div>
