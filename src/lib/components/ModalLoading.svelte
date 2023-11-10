<script>
    import { ProgressRadial } from "@skeletonlabs/skeleton"
</script>

<div class="bg-surface-900 p-14 rounded-lg flex items-center gap-10">
    <div class="flex flex-col gap-2">
        <h1 class="h3 font-semibold">Carregando SmartStockIt</h1>
        <p class="p">Aguarde um instante para o carregamento de todo o aplicativo SmartStockIt...</p>
    </div>
    <ProgressRadial value={undefined} width="w-10" stroke={100} />
</div>
