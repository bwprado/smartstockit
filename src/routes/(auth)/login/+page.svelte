<script lang="ts">
    import { enhance } from "$app/forms"
    import { Image } from "@unpic/svelte"
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
            <div class="items-center-justify-center mr-auto flex max-w-xs pl-10">
                <Image
                    src="https://res.cloudinary.com/drbrk2cvk/image/upload/v1701830378/smartstockit-logo-primary_o2lhag.svg"
                    alt="SmartStockIt App"
                    layout="constrained" />
            </div>
            <p class="mt-auto text-white">SmartStockIt App - 2023</p>
        </div>
    </section>
    <div class="flex w-full flex-col items-center justify-center gap-y-6 rounded-lg p-20">
        <form
            method="post"
            class="flex max-w-lg flex-col items-center justify-center gap-y-4"
            use:enhance={handleSubmit}>
            <Image
                src="https://res.cloudinary.com/drbrk2cvk/image/upload/v1701829379/logo-h-primary.svg"
                alt="SmartStockIt App"
                layout="constrained"
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
            url("https://res.cloudinary.com/drbrk2cvk/image/upload/v1701829377/ojp66t6lsbg5xhgqsgh6.jpg")
                1x,
            url("https://res.cloudinary.com/drbrk2cvk/image/upload/v1701829377/tg4vfhotgrvnqc8vlzw0.jpg")
                2x,
            url("https://res.cloudinary.com/drbrk2cvk/image/upload/v1701829377/ks08x1uxayoyecgwg6mg.jpg")
                3x,
            url("https://res.cloudinary.com/drbrk2cvk/image/upload/v1701829377/jv7wyypghoust7z9ieho.jpg")
                4x,
            url("https://res.cloudinary.com/drbrk2cvk/image/upload/v1701829377/cqaq83snqahrsgfwqljv.jpg")
                5x,
            url("https://res.cloudinary.com/drbrk2cvk/image/upload/v1701829377/xnwfguquvgox8sgwtnl4.jpg")
                6x,
            url("https://res.cloudinary.com/drbrk2cvk/image/upload/v1701829376/q434qzwlobvzfvvop9hc.jpg")
                7x,
            url("https://res.cloudinary.com/drbrk2cvk/image/upload/v1701829376/gjcfc8diahznkcxbygbj.jpg")
                8x,
            url("https://res.cloudinary.com/drbrk2cvk/image/upload/v1701829376/zpmhg73vvaptlssfhg2a.avif")
                9x
        );
        background-position: 10%;
        background-size: cover;
        height: 100%;
    }
</style>
