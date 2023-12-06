<script lang="ts">
    import { enhance } from "$app/forms"
    import { getModalStore } from "@skeletonlabs/skeleton"
    import type { SubmitFunction } from "@sveltejs/kit"

    import Button from "$lib/components/Button.svelte"
    import Input from "$lib/components/Input.svelte"

    const modal = getModalStore()

    const handleSubmit: SubmitFunction = async () => {
        modal.trigger({
            type: "component",
            component: "modalComponentLoading",
        })
        return async ({ update }) => {
            await update()
        }
    }
</script>

<div
    class="hero-gradient grid h-screen w-screen grid-cols-1 items-center justify-center overflow-hidden lg:grid-cols-2">
    <section class="hero-image hidden lg:block">
        <div class="flex h-full flex-col items-center pb-10 pt-20">
            <img
                src="src\images\smartstockit-logo-primary.svg"
                alt="SmartStockIt App"
                class="mr-auto max-h-[300px] pl-10" />
            <p class="mt-auto text-white">SmartStockIt App - 2023</p>
        </div>
    </section>
    <div class="flex w-full flex-col items-center justify-center gap-y-6 rounded-lg p-20">
        <form
            method="post"
            class="flex max-w-lg flex-col items-center justify-center gap-y-4"
            use:enhance={handleSubmit}>
            <img
                src="src\images\smartstockit-logo-h-rasterized-primary.svg"
                alt="SmartStockIt App"
                class="w-full" />
            <p class="font-bold">Login</p>
            <Input id="email" name="email" label="Email" type="email" />
            <Input id="password" name="password" label="Password" type="password" />
            <Button type="submit" id="login">Login</Button>
            <div
                class="grid w-full grid-cols-[1fr,max-content,1fr] items-center justify-center gap-x-4">
                <div class="border-b-[1px] border-surface-400" />
                <p class="text-[10px] uppercase text-surface-400">ou continue com</p>
                <div class="border-b-[1px] border-surface-400" />
            </div>
            <button
                type="submit"
                formaction="?provider=google"
                class="border-scale-500 flex h-10 w-full items-center justify-center rounded-lg border bg-surface-900 transition hover:bg-secondary-500/10">
                <div
                    class="group relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg transition">
                    <img
                        class="w-5"
                        src="https://supabase.com/docs/img/icons/google-icon.svg"
                        alt="Google Icon" />
                </div>
                <h5 class="text-scale-1200 px-4 text-base">Google</h5>
            </button>
        </form>
    </div>
</div>

<style>
    .hero-image {
        background-image: image-set(
            url("@images/hero-image-scale-w_1920.jpg") 1x,
            url("@images/hero-image-scale-w_1831.jpg") 2x,
            url("@images/hero-image-scale-w_1747.jpg") 3x,
            url("@images/hero-image-scale-w_1568.jpg") 4x,
            url("@images/hero-image-scale-w_1397.jpg") 5x,
            url("@images/hero-image-scale-w_1176.jpg") 6x,
            url("@images/hero-image-scale-w_1053.jpg") 7x,
            url("@images/hero-image-scale-w_828.jpg") 8x,
            url("@images/hero-image-scale-w_560.jpg") 9x
        );
        background-position: 10%;
        background-size: cover;
        height: 100%;
    }
</style>
