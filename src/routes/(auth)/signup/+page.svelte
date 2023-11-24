<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import Footer from "$lib/components/Footer.svelte"
    import IconButton from "$lib/components/IconButton.svelte"
    import Input from "$lib/components/Input.svelte"
    import Backgound from "$lib/images/shutterstock_2203155427.jpg"

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
        "overflow-hidden",
        "items-center",
        "justify-center",
        "sm:gap-y-10",
        "snap-mandatory",
        "snap-y",
        "h-screen",
        "bg-blend-multiply",
    ])
</script>

<div class={divWrapper}>
    <div class="relative snap-start">
        <div
            style="background-image: url({Backgound});"
            class="grid h-full snap-start grid-rows-[max-content,auto,max-content] items-center justify-between bg-gradient-to-r from-surface-900/50 to-surface-900/20 bg-cover sm:p-8">
            <header class="w-full p-6 text-white">
                <h1 class="text-4xl font-bold">Smart Stock It</h1>
                <p class="text-sm text-surface-200">
                    Sua Solução Gratuita de Gerenciamento de Estoque
                </p>
            </header>
            <main class="container mx-auto mt-4 p-4">
                <section class="rounded-xl p-6 shadow">
                    <h2 class="mb-4 text-lg font-semibold">Painel Intuitivo</h2>
                    <p class="text-sm text-gray-300">
                        Mantenha o controle do seu estoque com nosso painel fácil de usar, que
                        fornece uma visão rápida de métricas e tendências-chave.
                    </p>
                </section>
                <section class="mt-4 rounded-xl p-6 shadow">
                    <h2 class="mb-4 text-lg font-semibold">Rastreamento de Produtos</h2>
                    <p class="text-sm text-gray-300">
                        Adicione, edite e categorize seus produtos sem esforço. Fique de olho nos
                        níveis de estoque e receba notificações de estoque baixo.
                    </p>
                </section>
            </main>
            <div class="flex flex-col items-center justify-center gap-4 py-10 sm:hidden sm:py-0">
                <p>Clique para criar sua conta</p>
                <IconButton
                    class="aspect-square h-10 rounded-full"
                    intent="secondary"
                    on:click={() => {
                        bottom.scrollIntoView({ behavior: "smooth" })
                    }}>
                    <svelte:fragment slot="icon">
                        <ArrowBigDown class="animate-bounce text-white" />
                    </svelte:fragment>
                </IconButton>
            </div>
        </div>
    </div>
    <div
        bind:this={bottom}
        class="hero-gradient flex h-screen w-full snap-start flex-col items-center justify-center gap-y-4 px-[15%] py-8 sm:h-full"
        id="bottom">
        <form method="POST" action="?/email" class="flex w-full flex-col gap-y-6">
            <h1 class="text-2xl font-bold">Criar uma Conta Gratuita</h1>
            <p>Entre com seu Email e Senha.</p>
            <Input id="email" name="email" type="text" placeholder="email@email.com" />
            <Input id="password" name="password" type="password" placeholder="smartstock" />
            <Button type="submit" id="login">Criar Conta</Button>
        </form>
        <div
            class="grid w-full grid-cols-[1fr,max-content,1fr] items-center justify-center gap-x-4">
            <div class="border-b-[1px] border-tertiary-400" />
            <p class="text-xs uppercase text-tertiary-400">ou continue com</p>
            <div class="border-b-[1px] border-tertiary-400" />
        </div>
        <form action="?/google" class="w-full" method="post">
            <button
                type="submit"
                class="flex h-10 w-full items-center justify-center rounded-lg border border-surface-400 bg-surface-900 transition hover:bg-secondary-500/10">
                <div
                    class="group relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg transition">
                    <img
                        class="w-5"
                        src="https://supabase.com/docs/img/icons/google-icon.svg"
                        alt="Google Icon" />
                </div>
                <h5 class="px-4 text-base text-surface-200">Google</h5>
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
