<script>
    import IconButton from "$lib/components/IconButton.svelte"
    import { HomeIcon } from "lucide-svelte"
</script>

<div
    class="grid sm:grid-cols-2 rounded-xl sm:border dark:border-gray-500 w-full sm:m-10 h-auto sm:h-[800px] overflow-hidden items-center justify-center sm:gap-y-10 snap-mandatory snap-y bg-blend-multiply">
    <div class="h-screen sm:h-full snap-start">
        <!-- Background Image -->
        <div
            class="absolute inset-0 bg-cover -z-10 bg-center"
            style="background-image: url(https://vhjquurwdlkrfmaxfygm.supabase.co/storage/v1/object/public/images/pexels-winson-2701434.jpg?t=2023-09-06T00%3A55%3A13.176Z);">
        </div>
        <!-- Content Container -->
        <div
            class="bg-gradient-to-r from-surface-900 to-surface-900/20 h-full sm:p-8 flex flex-col justify-between snap-start items-center">
            <!-- Header Section -->
            <header class="p-6 text-white w-full">
                <h1 class="text-4xl font-bold">404 - Página Não Encontrada</h1>
                <p class="text-sm text-surface-200">
                    Desculpe, a página que você está procurando não existe.
                </p>
            </header>
            <!-- Main Content Section -->
            <main class="container mx-auto mt-8 p-4">
                <section class="bg-surface-800 rounded-xl shadow p-6">
                    <h2 class="text-xl font-semibold mb-4">O que fazer a seguir?</h2>
                    <p class="text-gray-500">
                        Você pode retornar à página inicial ou verificar o URL para ter certeza de
                        que está correto.
                    </p>
                </section>
            </main>
            <!-- Footer Section -->
            <div class="flex flex-col items-center justify-center">
                <p>Clique para voltar à página inicial</p>
                <IconButton
                    customClasses="h-10 rounded-full"
                    on:click={() => {
                        // Implement redirection to the homepage here
                    }}>
                    <HomeIcon class="text-white animate-bounce" />
                </IconButton>
            </div>
        </div>
    </div>
</div>
