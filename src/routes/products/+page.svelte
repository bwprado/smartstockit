<script lang="ts">
	export let data;
</script>

<section class="flex flex-col gap-y-4 w-full items-center">
	<div>
		<form
			method="POST"
			class="flex gap-x-4 p-4 items-end justify-center bg-slate-300 w-full text-gary"
		>
			<div class="flex flex-col gap-y-1">
				<label for="product">Nome</label>
				<input name="product" id="product" type="text" class="" />
			</div>
			<div class="flex flex-col gap-y-1">
				<label for="unit">Unidade</label>
				<select name="unit" id="unit" class="">
					<option>und</option>
					<option>kg</option>
					<option>litro</option>
				</select>
			</div>
			<button
				type="submit"
				class="px-4 py-2 font-bold bg-blue-600 rounded-lg text-gray-100 hover:opacity-50"
				>+ Produto</button
			>
		</form>
	</div>
	<table class="table-auto w-1/2">
		<thead>
			<tr class="text-left">
				<th>Index</th>
				<th>Nome</th>
				<th>Unidade</th>
				<th>Saldo</th>
			</tr>
		</thead>
		<tbody>
			{#if data.products.length > 0}
				{#each data.products as products, index}
                <tr>
                        <td>{index}</td>
						<td>{products.name}</td>
						<td>{products.unit}</td>
						<td>{products.balance}</td>
					</tr>
				{/each}
			{:else}
				<tr>Nenhum produto encontrado</tr>
			{/if}
		</tbody>
	</table>
</section>
