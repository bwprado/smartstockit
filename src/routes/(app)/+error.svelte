<script lang="ts">
    import Button from "$lib/components/Button.svelte"

    import { page } from "$app/stores"
    import { redirect } from "@sveltejs/kit"
</script>

<div class="flex w-auto h-full overflow-hidden items-center justify-center hero-gradient">
    <div
        class="w-[350px] sm:w-[500px] items-center flex flex-col gap-y-6 justify-center rounded-lg border dark:border-surface-500 bg-surface-800 p-10 sm:p-20">
        <div class="flex flex-col gap-y-6 items-center justify-center w-full">
            <h1 class="font-bold text-3xl">Infelizmente aconteceu um Erro.</h1>
            <p class="font-bold">{$page.error?.message || "Erro não reconhecido."}</p>

            <Button type="button" on:click={() => redirect(301, "/")} id="login">Voltar para tela principal</Button>
        </div>
    </div>
</div>
