<script lang="ts">
    import "../app.css"
    import Button from "$lib/components/Button.svelte"
</script>

<title>Smart Stock It</title>
<header
    class="flex h-max w-full bg-primary-500 items-center text-gray-200 justify-between py-4 px-4">
    <div class="hidden sm:block">
        <a href="/" class="text-xl font-bold">Smart Stock It</a>
    </div>
    <ul>
        <li>
            <a href="/login">
                <Button id="login" intent="secondary">Login</Button>
            </a>
        </li>
    </ul>
</header>

<div class="flex flex-col gap-y-20 py-10 px-4 scroll-y snap-mandatory items-center">
    <div
        class="flex flex-col items-center justify-center text-white gap-y-8 h-screen snap-center">
        <h1 class="text-6xl font-bold">Gerencie seu estoque com facilidade</h1>
        <p class="text-xl">
            Bem-vindo ao nosso aplicativo de estoque, a solução perfeita para o seu negócio.
        </p>
        <Button class="text-lg p-8" href="/signup">Crie uma conta gratuita</Button>
    </div>

    <div class="mx-auto flex flex-col items-center justify-center h-screen snap-center">
        <h2 class="text-4xl font-bold mb-8">Recursos incríveis do nosso aplicativo de estoque</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="p-6 border border-surface-500 rounded-lg text-center">
                <h3 class="text-xl font-semibold mb-4">Gestão de Inventário</h3>
                <p class="text-lg text-surface-400">
                    Mantenha um controle completo de seus produtos e estoque em tempo real.
                </p>
            </div>
            <div class="p-6 border border-surface-500 rounded-lg text-center">
                <h3 class="text-xl font-semibold mb-4">Relatórios Detalhados</h3>
                <p class="text-lg text-surface-400">
                    Gere relatórios detalhados para analisar o desempenho do seu estoque.
                </p>
            </div>
            <div class="p-6 border border-surface-500 rounded-lg text-center">
                <h3 class="text-xl font-semibold mb-4">Integrações Poderosas</h3>
                <p class="text-lg text-surface-400">
                    Conecte-se facilmente com outras ferramentas para otimizar seu fluxo de
                    trabalho.
                </p>
            </div>
        </div>
    </div>

    <div
        class="container mx-auto flex flex-col items-center justify-center text-white h-screen snap-center">
        <h2 class="text-4xl font-bold mb-6">Não perca mais tempo, comece hoje!</h2>
        <p class="text-2xl mb-8">
            Registre-se agora e experimente todos os benefícios do nosso aplicativo de estoque.
        </p>
        <Button href="/signup" class="font-bold text-xl p-10">Crie uma conta gratuita</Button>
    </div>
</div>
