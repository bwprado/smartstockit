<script>
    import Button from "$lib/components/Button.svelte"
    import Footer from "$lib/components/Footer.svelte"
    import IconButton from "$lib/components/IconButton.svelte"
    import { ArrowBigRight } from "lucide-svelte"
</script>

<div
    class="grid sm:grid-cols-2 rounded-xl sm:border dark:border-surface-500 w-full sm:m-10 h-auto sm:h-[800px] overflow-hidden items-center justify-center sm:gap-y-10 hero-gradient">
    <div class="h-screen sm:h-full snap-start">
        <div
            class="bg-gradient-to-r from-surface-900 to-surface-900/20 h-full sm:p-8 flex flex-col justify-between snap-start items-center">
            <header class="px-6 py-10 text-white w-full">
                <h1 class="text-4xl font-bold">Continue com seu Email</h1>
                <p class="text-sm text-surface-200">
                    Por favor, prossiga com o login usando seu endereço de email.
                </p>
            </header>
            <main class="container mx-auto mt-8 p-4">
                <section class="bg-surface-800 rounded-xl shadow p-6">
                    <h2 class="text-xl font-semibold mb-4">Instruções</h2>
                    <p class="text-surface-300">
                        Após o login, você receberá um email de verificação para continuar.
                    </p>
                </section>
            </main>
            <div class="flex flex-col items-center justify-center">
                <Button
                    type="button"
                    on:click={() => {
                        // Implement your email login redirection logic here
                    }}>
                    Fazer Login
                    <ArrowBigRight class="text-white animate-pulse" />
                </Button>
            </div>
            <Footer customClass="pb-4" />
        </div>
    </div>
</div>
