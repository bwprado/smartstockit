<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import Input from "$lib/components/Input.svelte"
    import { ArrowBigRight } from "lucide-svelte"
    import type { PageData } from "./$types"

    export let data: PageData
    const { email } = data
</script>

<div
    class="rounded-xl sm:border dark:border-surface-500 w-full sm:m-10 h-auto sm:h-[800px] overflow-hidden items-center justify-center sm:gap-y-10 hero-gradient grid grid-cols-2">
    <div
        class="bg-gradient-to-r from-surface-900 to-surface-900/20 h-full sm:p-8 grid grid-rows-[0.5fr,1fr,0.5fr] justify-between snap-start items-center">
        <header class="px-6 pt-10 text-white w-full mb-auto">
            <h1 class="text-4xl font-bold">Continue com seu Email</h1>
            <p class="text-sm text-surface-200">
                Por favor, prossiga com o login usando seu endereço de email.
            </p>
        </header>
        <main class="container mx-auto p-4">
            <section class="bg-surface-800 rounded-xl shadow p-6">
                <h2 class="text-xl font-semibold mb-4">Instruções</h2>
                <p class="text-surface-300">
                    Um email foi enviado para <span class="font-semibold">{email}</span> com um link
                    de verificação. Por favor, verifique seu email e clique no link para continuar.
                </p>
            </section>
        </main>
    </div>
    <div class="px-[15%] grid grid-rows-[1fr,2fr,1fr] items-center justify-center h-full p-6">
        <header class="text-white w-full mb-auto pt-10">
            <h1 class="text-4xl font-bold">Email Verificado</h1>
            <p class="text-sm text-surface-200">
                Seu email foi verificado, agora basta fazer login para continuar.
            </p>
        </header>
        <form
            action="?/verify"
            method="post"
            class="flex flex-col items-center justify-center gap-y-6">
            <Input type="email" name="email" placeholder="Email" value={email || ""} />
            <Input type="password" name="password" placeholder="Password" />
            <Button type="submit">
                Fazer Login
                <ArrowBigRight class="text-white animate-pulse" />
            </Button>
        </form>
    </div>
</div>
