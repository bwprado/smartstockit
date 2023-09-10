<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import Footer from "$lib/components/Footer.svelte"
    import IconButton from "$lib/components/IconButton.svelte"
    import Input from "$lib/components/Input.svelte"
    import { ArrowBigDown } from "lucide-svelte"
    import { getToastStore } from "@skeletonlabs/skeleton"
    import type { ActionData } from "./$types"
    import { cx } from "class-variance-authority"

    const toast = getToastStore()

    let bottom: HTMLDivElement

    export let form: ActionData

    const { status, body } = form || {}

    if (status === 400) {
        toast.trigger({
            message: body || "Erro ao criar conta",
            background: "bg-error-600",
            classes: "text-error",
        })
    }

    const divWrapper = cx([
        "grid",
        "sm:grid-cols-2",
        "rounded-xl",
        "sm:border",
        "dark:border-gray-500",
        "w-full",
        "sm:m-10",
        "h-auto",
        "sm:h-[800px]",
        "overflow-hidden",
        "items-center",
        "justify-center",
        "sm:gap-y-10",
        "snap-mandatory",
        "snap-y",
        "bg-blend-multiply",
    ])
</script>

<div class={divWrapper}>
    <div class="h-screen sm:h-full snap-start relative">
        <div
            class="absolute inset-0 bg-cover -z-10 bg-center"
            style="background-image: url(https://vhjquurwdlkrfmaxfygm.supabase.co/storage/v1/object/public/images/pexels-winson-2701434.jpg?t=2023-09-06T00%3A55%3A13.176Z);" />
        <div
            class="bg-gradient-to-r from-surface-900 to-surface-900/20 h-full sm:p-8 grid grid-rows-[max-content,auto,max-content] justify-between snap-start items-center">
            <header class="p-6 text-white w-full">
                <h1 class="text-4xl font-bold">Smart Stock It</h1>
                <p class="text-sm text-surface-200">
                    Sua Solução Gratuita de Gerenciamento de Estoque
                </p>
            </header>
            <main class="container mx-auto mt-8 p-4">
                <section class="bg-surface-800 rounded-xl shadow p-6">
                    <h2 class="text-xl font-semibold mb-4">Painel Intuitivo</h2>
                    <p class="text-gray-500">
                        Mantenha o controle do seu estoque com nosso painel fácil de usar, que
                        fornece uma visão rápida de métricas e tendências-chave.
                    </p>
                </section>
                <section class="bg-surface-800 rounded-xl shadow p-6 mt-4">
                    <h2 class="text-xl font-semibold mb-4">Rastreamento de Produtos</h2>
                    <p class="text-gray-500">
                        Adicione, edite e categorize seus produtos sem esforço. Fique de olho nos
                        níveis de estoque e receba notificações de estoque baixo.
                    </p>
                </section>
            </main>
            <div class="flex flex-col items-center justify-center sm:hidden py-10 sm:py-0">
                <p>Clique para criar sua conta</p>
                <IconButton
                    class="h-10 rounded-full"
                    on:click={() => {
                        bottom.scrollIntoView({ behavior: "smooth" })
                    }}>
                    <ArrowBigDown class="text-white animate-bounce" />
                </IconButton>
            </div>
        </div>
    </div>
    <div
        bind:this={bottom}
        class="w-full py-8 px-[15%] sm:h-full h-screen snap-start flex flex-col gap-y-4 items-center justify-center hero-gradient"
        id="bottom">
        <form method="POST" action="?/email" class="flex flex-col gap-y-6 w-full">
            <h1 class="font-bold text-2xl">Criar uma Conta Gratuita</h1>
            <p>Entre com seu Email</p>
            <Input id="email" name="email" type="text" placeholder="email@email.com" />
            <Button type="submit" id="login">Criar Conta</Button>
        </form>
        <div
            class="grid grid-cols-[1fr,max-content,1fr] items-center justify-center w-full gap-x-4">
            <div class="border-b-[1px] border-tertiary-400" />
            <p class="uppercase text-xs text-tertiary-400">ou continue com</p>
            <div class="border-b-[1px] border-tertiary-400" />
        </div>
        <form action="?/google" class="w-full" method="post">
            <button
                type="submit"
                class="flex items-center justify-center bg-surface-900 rounded-lg border border-surface-400 hover:bg-secondary-500/10 transition w-full h-10">
                <div
                    class="relative flex items-center justify-center shrink-0 h-10 w-10 rounded-lg group overflow-hidden transition">
                    <img
                        class="w-5"
                        src="https://supabase.com/docs/img/icons/google-icon.svg"
                        alt="Google Icon" />
                </div>
                <h5 class="text-base text-surface-200 px-4">Google</h5>
            </button>
        </form>
    </div>
</div>

<style>
    .hero-gradient {
        background-image: radial-gradient(
                at 0% 0%,
                rgba(var(--color-secondary-500) / 0.33) 0px,
                transparent 50%
            ),
            radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.33) 0px, transparent 50%);
    }
</style>
