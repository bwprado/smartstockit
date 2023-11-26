<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import "../app.css"
    import _ from "lodash"

    import type { PageData } from "./$types"

    export let data: PageData
    const { session } = data || { session: null }

    let y: number
    let header: HTMLHeadElement
    let more: HTMLElement
    let last: HTMLElement

    $: scrollY = Math.round(y / 3)
    $: opacity = _.clamp(Math.round(y) / 1000, 0, 1)
</script>

<svelte:window bind:scrollY={y} />

<head>
    <title>Smart Stock It | Sistema avançado de estoque para empresas.</title>
</head>

<header
    bind:this={header}
    class="fixed z-10 flex h-[100px] w-full items-center justify-between px-4 py-8 text-gray-200 transition-all sm:px-8"
    style="background-color: rgba(21, 23, 31, {opacity})">
    <a href="/" class="text-xl font-bold">
        <enhanced:img
            src="@images/smartstockit-logo-h-rasterized-primary.svg"
            class="w-52 sm:w-[250px]"
            alt="SmartStockIt App" />
    </a>
    <ul>
        <li>
            <a href={session ? "/dashboard" : "/login"}>
                <Button id="login" intent="secondary">{session ? "Dashboard" : "Login"}</Button>
            </a>
        </li>
    </ul>
</header>

<main class="flex snap-y snap-mandatory flex-col items-center overflow-auto">
    <section
        class="hero-image relative flex h-screen w-full snap-center flex-col items-center justify-center gap-y-8 bg-cover px-4 text-white"
        style="background-position: center {scrollY}px">
        <div class="mt-32 flex w-full max-w-prose flex-col gap-4 rounded-xl">
            <h1 class="text-4xl font-bold sm:text-6xl">Gerencie seu estoque com facilidade</h1>
            <p class="text-xl">
                Bem-vindo ao nosso aplicativo de estoque, a solução perfeita para o seu negócio.
            </p>
            <div class="grid w-full grid-cols-2 gap-8">
                <Button
                    class="w-full p-2 text-sm sm:text-lg"
                    intent="secondary"
                    on:click={() => more.scrollIntoView({ behavior: "smooth" })}>Saber mais</Button>
                <Button class="w-full p-2 text-sm sm:text-lg" href="/signup"
                    >Crie uma conta gratuita</Button>
            </div>
        </div>
    </section>

    <section
        id="more"
        bind:this={more}
        class="hero-gradient mx-auto flex h-[calc(100vh-100px)] snap-center flex-col items-center justify-center sm:h-screen py-32">
        <div class="grid h-full w-full grid-cols-2 gap-4 px-8 sm:flex-row sm:items-center">
            <div class="mt-[100px] flex flex-col gap-8 rounded-lg p-4 sm:mt-0 sm:h-auto sm:p-8">
                <p class="text-primary-400-500-token text-sm font-bold">Controle</p>
                <div>
                    <h2 class="text-2xl font-bold sm:text-3xl">
                        Recursos incríveis do nosso aplicativo de estoque
                    </h2>
                    <p class="text-sm text-surface-400">
                        Cadastramento de produtos, controle de estoque, relatórios detalhados e
                        muito mais.
                    </p>
                </div>
                <div class="grid grid-rows-1 gap-x-4 gap-y-10 sm:grid-cols-2 sm:gap-x-10">
                    <div class="grid w-full grid-rows-2 items-center gap-4">
                        <h3 class="text-md font-semibold sm:text-lg">
                            Cadastro de Produtos Completo
                        </h3>
                        <p class="text-sm text-surface-400">
                            Cadastre seus produtos com todas as informações necessárias para um
                            controle eficiente e preciso. Crie categorias, unidades de medida,
                            marcas e muito mais.
                        </p>
                        <Button
                            intent="secondary"
                            class="text-md h-10 w-full p-2 sm:w-fit"
                            on:click={() => last.scrollIntoView({ behavior: "smooth" })}
                            >Saiba mais</Button>
                    </div>
                    <div class="grid w-full grid-rows-3 items-center gap-4">
                        <h3 class="text-md font-semibold sm:text-lg">Vários tipos de Produtos</h3>
                        <p class="text-sm text-surface-400">
                            Produtos simples, compostos, kits, matérias-primas, embalagens, insumos
                            e muito mais.
                        </p>
                        <Button class="text-md h-10 w-full p-2 sm:w-fit" href="/signup"
                            >Crie uma conta</Button>
                    </div>
                </div>
            </div>
            <enhanced:img src="@images/iphone15pro.png" alt="iPhone App" class="max-h-[900px] w-fit px-8" />
        </div>
        <!-- <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div class="rounded-lg border border-surface-500 p-6 text-center">
                <h3 class="mb-4 text-xl font-semibold">Relatórios Detalhados</h3>
                <p class="text-lg text-surface-400">
                    Gere relatórios detalhados para analisar o desempenho do seu estoque.
                </p>
            </div>
            <div class="rounded-lg border border-surface-500 p-6 text-center">
                <h3 class="mb-4 text-xl font-semibold">Integrações Poderosas</h3>
                <p class="text-lg text-surface-400">
                    Conecte-se facilmente com outras ferramentas para otimizar seu fluxo de
                    trabalho.
                </p>
            </div>
        </div> -->
    </section>

    <section
        bind:this={last}
        class="mx-auto flex h-screen w-full snap-center flex-col items-center justify-center bg-gradient-to-b from-surface-900 to-primary-500/10 px-4 text-white sm:px-8">
        <h2 class="mb-6 text-2xl font-bold sm:text-3xl">Não perca mais tempo, comece hoje!</h2>
        <p class="mb-8 text-lg sm:text-2xl">
            Registre-se agora e experimente todos os benefícios do nosso aplicativo de estoque.
        </p>
        <Button href="/signup" class="p-4 text-xl font-bold">Crie uma conta gratuita</Button>
    </section>
</main>

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
    }
</style>
