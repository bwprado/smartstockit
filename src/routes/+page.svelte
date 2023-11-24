<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import iPhone from "$lib/images/iphone15pro.png"
    import { clamp } from "lodash"
    import "../app.css"

    import type { PageData } from "./$types"

    export let data: PageData
    const { session } = data || { session: null }

    let y: number
    let header: HTMLHeadElement

    $: opacity = clamp(y, 0, 100)
</script>

<svelte:window bind:scrollY={y} />

<head>
    <title>Smart Stock It | Sistema avançado de estoque para empresas.</title>
</head>

<header
    bind:this={header}
    class="fixed flex h-[100px] w-full items-center justify-between px-4 py-8 text-gray-200 transition-all"
    style={`backdrop-filter: blur(${opacity / 20}px)`}>
    <div class="backdrop-blur-sm">
        <a href="/" class="text-xl font-bold">
            <img
                src="src\lib\images\smartstockit-logo-h-rasterized-primary.svg"
                class="w-52 sm:w-[250px]"
                alt="SmartStockIt" />
        </a>
    </div>
    <ul>
        <li>
            <a href={session ? "/dashboard" : "/login"}>
                <Button id="login" intent="secondary">{session ? "Dashboard" : "Login"}</Button>
            </a>
        </li>
    </ul>
</header>

<main class="flex snap-y snap-mandatory flex-col items-center gap-y-10 overflow-auto sm:gap-y-20">
    <section
        class="flex h-screen w-full snap-center flex-col items-center justify-center gap-y-8 bg-cover text-white"
        style="background-image: url('/src/lib/images/shutterstock_2203155427.jpg'); background-position: center {y /
            3}px">
        <div class="mt-32 flex flex-col gap-4 rounded-xl p-4 sm:w-1/2 sm:p-10">
            <h1 class="text-4xl font-bold sm:text-6xl">Gerencie seu estoque com facilidade</h1>
            <p class="text-xl">
                Bem-vindo ao nosso aplicativo de estoque, a solução perfeita para o seu negócio.
            </p>
            <div class="grid w-full grid-cols-2 gap-8">
                <Button class="w-full p-2 text-sm sm:text-lg" intent="secondary">Saber mais</Button>
                <Button class="w-full p-2 text-sm sm:text-lg" href="/signup"
                    >Crie uma conta gratuita</Button>
            </div>
        </div>
    </section>

    <div
        id="more"
        class="mx-auto flex h-auto snap-center flex-col items-center justify-center sm:h-[calc(100vh-100px)]">
        <div class="box-border flex h-full w-full flex-col gap-4 sm:flex-row sm:items-center">
            <img src={iPhone} alt="iPhone App" class="order-2 h-[80%] px-20 sm:order-1" />
            <div
                class="mt-[100px] flex h-[calc(100vh-100px)] flex-col gap-8 rounded-lg p-4 sm:mt-0 sm:h-auto sm:p-8">
                <p class="text-primary-400-500-token text-xs font-bold">Controle</p>
                <div>
                    <h2 class="text-2xl font-bold sm:text-3xl">
                        Recursos incríveis do nosso aplicativo de estoque
                    </h2>
                    <p class="text-sm text-surface-400">
                        Cadastramento de produtos, controle de estoque, relatórios detalhados e
                        muito mais.
                    </p>
                </div>
                <div class="grid grid-cols-2 gap-x-4 gap-y-3 sm:gap-x-10">
                    <h3 class="text-md font-semibold sm:text-lg">Cadastro de Produtos Completo</h3>
                    <h3 class="text-md font-semibold sm:text-lg">Vários tipos de Produtos</h3>
                    <p class="text-sm text-surface-400">
                        Cadastre seus produtos com todas as informações necessárias para um controle
                        eficiente e preciso. Crie categorias, unidades de medida, marcas e muito
                        mais.
                    </p>
                    <p class="text-sm text-surface-400">
                        Produtos simples, compostos, kits, matérias-primas, embalagens, insumos e
                        muito mais.
                    </p>
                    <Button intent="secondary" class="text-md mt-6 h-10 p-2 sm:w-fit" href="/signup"
                        >Saiba mais</Button>
                    <Button class="text-md mt-6 h-10 p-2 sm:w-fit" href="/signup"
                        >Crie uma conta</Button>
                </div>
            </div>
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
    </div>

    <div
        class="mx-auto flex h-screen snap-center flex-col items-center justify-center p-4 sm:p-8 text-white">
        <h2 class="mb-6 text-2xl font-bold sm:text-3xl">Não perca mais tempo, comece hoje!</h2>
        <p class="mb-8 text-lg sm:text-2xl">
            Registre-se agora e experimente todos os benefícios do nosso aplicativo de estoque.
        </p>
        <Button href="/signup" class="p-4 text-xl font-bold">Crie uma conta gratuita</Button>
    </div>
</main>
