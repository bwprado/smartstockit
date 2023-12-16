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
    style="background-color: rgba(21, 23, 31, {opacity})"
>
    <a href="/" class="text-xl font-bold">
        <enhanced:img
            src="@images/smartstockit-logo-h-rasterized-primary.svg"
            class="w-52 sm:w-[250px]"
            alt="SmartStockIt App"
        />
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
        style="background-position: center {scrollY}px"
    >
        <div class="mt-32 flex w-full max-w-prose flex-col gap-4 rounded-xl">
            <h1 class="text-4xl font-bold sm:text-6xl">Gerencie seu estoque com facilidade</h1>
            <p class="text-xl">
                Bem-vindo ao nosso aplicativo de estoque, a solução perfeita para o seu negócio.
            </p>
            <div class="grid w-full grid-cols-2 gap-8">
                <Button
                    class="h-full w-full p-2 text-sm sm:text-lg"
                    intent="secondary"
                    on:click={() => more.scrollIntoView({ behavior: "smooth" })}>Saber mais</Button
                >
                <Button class="h-fit w-full p-2 text-sm sm:text-lg" href="/signup"
                    >Crie uma conta gratuita</Button
                >
            </div>
        </div>
    </section>

    <section
        id="more"
        bind:this={more}
        class="hero-gradient mx-auto flex h-[calc(calc(100vh+100px)*2)] snap-center sm:h-[calc(100vh+100px)]"
    >
        <div
            class="flex h-full w-full flex-col gap-20 pl-4 pr-4 pt-[100px] sm:grid sm:grid-cols-[1.5fr,1fr] sm:items-center sm:gap-10 sm:pl-8 sm:pr-0"
        >
            <div class="flex flex-col gap-10 rounded-lg sm:h-auto sm:gap-8">
                <p class="text-primary-400-500-token text-sm font-bold">Controle</p>
                <div>
                    <h2 class="text-2xl font-bold sm:text-3xl">
                        Recursos incríveis do nosso aplicativo de <span class="w-fit bg-primary-500"
                            >estoque</span
                        >
                    </h2>
                    <p class="text-sm text-surface-400">
                        Cadastramento de produtos, controle de estoque, relatórios detalhados e
                        muito mais.
                    </p>
                </div>
                <div class="grid grid-rows-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:gap-x-10">
                    <div class="flex w-full flex-col gap-4 sm:items-center">
                        <h3 class="text-md font-semibold lg:text-lg">
                            Cadastro de Produtos Completo
                        </h3>
                        <p class="text-sm text-surface-400">
                            Possibilidade de criar categorias, unidades, marcas, fornecedores para
                            um controle mais preciso de produtos.
                        </p>
                        <Button
                            intent="secondary"
                            class="text-md mt-auto w-fit p-2 sm:w-full"
                            on:click={() => last.scrollIntoView({ behavior: "smooth" })}
                            >Saiba mais</Button
                        >
                    </div>
                    <div class="flex w-full flex-col gap-4 sm:items-center">
                        <h3 class="text-md font-semibold sm:text-lg">Vários tipos de Produtos</h3>
                        <p class="text-sm text-surface-400">
                            Produtos simples, compostos, kits, matérias-primas, embalagens, insumos
                            e muito mais.
                        </p>
                        <Button class="text-md mt-auto w-fit p-2 sm:w-full" href="/signup"
                            >Crie uma conta</Button
                        >
                    </div>
                </div>
            </div>
            <enhanced:img
                src="@images/iphone15pro.png"
                alt="iPhone App"
                class="max-h-[800px] overflow-clip sm:w-fit"
            />
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
        class="mx-auto flex h-screen w-full snap-center flex-col items-center justify-center bg-gradient-to-b from-surface-900 to-primary-500/10 px-4 text-white sm:px-8"
    >
        <h2 class="mb-6 text-2xl font-bold sm:text-3xl">Não perca mais tempo, comece hoje!</h2>
        <p class="mb-8 text-lg sm:text-2xl">
            Registre-se agora e experimente todos os benefícios do nosso aplicativo de estoque.
        </p>
        <Button href="/signup" class="h-10 w-fit p-4 text-xl font-bold"
            >Crie uma conta gratuita</Button
        >
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
