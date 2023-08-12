<script>
	export let data;
    const { inventory } = data
</script>

<div class="w-1/2 flex flex-col gap-y-2 m-auto">
	{#if inventory.length > 0}
		{#each inventory as item}
			<div>{item.product}</div>
		{/each}
	{:else}
		<span>Nenhum produto encontrado</span>
	{/if}
</div>
