<script lang="ts">
    import Button from '$lib/components/Button.svelte'
    import Input from '$lib/components/Input.svelte'
    import { getToastStore } from '@skeletonlabs/skeleton'
    import type { ActionData } from './$types.js'

    const toastStore = getToastStore()

    export let form: ActionData

    if (form?.status) {
        toastStore.trigger({
            message: form?.body,
        })
    }
</script>

<div
    class="grid grid-cols-2 rounded-lg border dark:border-gray-500 w-full m-10 h-[800px] overflow-hidden items-center justify-center">
    <div class="relative h-full">
        <div
            class="absolute inset-0 bg-cover -z-10"
            style="
    background-image:
    url(https://vhjquurwdlkrfmaxfygm.supabase.co/storage/v1/object/public/images/pexels-winson-2701434.jpg?t=2023-09-06T00%3A55%3A13.176Z);" />
        <div
            class="bg-gradient-to-r from-gray-900 to-gray-900/20 h-full p-8 flex flex-col justify-between">
            <header class="p-4 text-white">
                <h1 class="text-2xl font-bold">Inventory Buddy</h1>
                <p class="text-sm">Sua Solução Gratuita de Gerenciamento de Estoque</p>
            </header>
            <main class="container mx-auto mt-8 p-4">
                <section class="bg-gray-900/90 rounded-lg shadow p-6">
                    <h2 class="text-xl font-semibold mb-4">Painel Intuitivo</h2>
                    <p class="text-gray-500">
                        Mantenha o controle do seu estoque com nosso painel fácil de usar, que
                        fornece uma visão rápida de métricas e tendências-chave.
                    </p>
                </section>
                <section class="bg-gray-900/90 rounded-lg shadow p-6 mt-4">
                    <h2 class="text-xl font-semibold mb-4">Rastreamento de Produtos</h2>
                    <p class="text-gray-500">
                        Adicione, edite e categorize seus produtos sem esforço. Fique de olho nos
                        níveis de estoque e receba notificações de estoque baixo.
                    </p>
                </section>
                <!-- Mais seções para outras funcionalidades podem ser adicionadas aqui -->
            </main>
            <footer class="p-4 text-white text-center mt-8 text-sm">
                <p>
                    &copy; 2023 Inventory Buddy. Todos os direitos reservados para <strong
                        >Working in Progress Dev</strong
                    >.
                </p>
            </footer>
        </div>
    </div>
    <form method="post" class="flex flex-col gap-y-6 w-full py-8 items-center justify-center px-32">
        <h1 class="font-bold text-2xl">Criar uma Conta Gratuita</h1>
        <p>Entre com seu Email</p>
        <Input id="email" name="email" label="Email" type="text" />
        <Input id="password" name="password" label="Password" type="password" />
        <Button type="submit" id="login">Login</Button>
        <div
            class="grid grid-cols-[1fr,max-content,1fr] items-center justify-center w-full gap-x-4">
            <div class="border-b-[1px] border-gray-500" />
            <p class="uppercase text-xs text-gray-500">ou continue com</p>
            <div class="border-b-[1px] border-gray-500" />
        </div>
        <button
            class="flex items-center justify-center gap-x-2 bg-gray-900 rounded-lg border border-scale-500">
            <div
                class="relative flex items-center justify-center shrink-0 h-10 w-10 rounded-lg group overflow-hidden bg-white dark:bg-gray-900 transition">
                <img
                    class="w-5"
                    src="https://supabase.com/docs/img/icons/google-icon.svg"
                    alt="Google Icon" />
            </div>
            <h5 class="text-base text-scale-1200 px-4">Google</h5>
        </button>
    </form>
</div>
