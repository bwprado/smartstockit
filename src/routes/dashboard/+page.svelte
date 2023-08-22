<script>
	export let data;
	const { dashboard } = data || {};
</script>

<div class="w-1/2 flex flex-col gap-y-2 mx-auto p-8">
	<table>
		<thead>
			<tr class="text-left">
				<th>Código de barras</th>
				<th>Produto</th>
				<th>Quantidade</th>
				<th>Preço médio</th>
			</tr>
		</thead>
		<tbody>
			{#if dashboard?.length > 0}
				{#each dashboard as item}
					<tr>
						<td>{item.barcode}</td>
						<td>{item.product_name}</td>
						<td>{item.total_amount}</td>
						<td
							>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
								item.average_price
							)}</td
						>
					</tr>
				{/each}
			{:else}
				<span>Nenhum produto encontrado</span>
			{/if}
		</tbody>
	</table>
</div>
