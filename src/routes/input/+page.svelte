<script>
	import Input from '$lib/components/Input.svelte'

	export let data;
	const products = data?.products || [];
	let isFresh = false;
</script>

<div class="w-1/2 flex flex-col mx-auto">
	<form method="post" class="flex flex-col gap-y-4">
		<div class="flex flex-col gap-y-1">
			<label for="product">Produto</label>
			<select name="product" id="product" class="">
				{#each products as product}
					<option value={product?.id}>{product?.name}</option>
				{/each}
			</select>
		</div>
        <Input name="amount" id="amount" type="number" label="Quantidade" />
        <Input name="price" id="price" type="number" label="Preço" />
		<div class="flex flex-col gap-y-1 items-start">
			<label for="fresh">Produto Fresco</label>
			<input
				name="fresh"
				id="fresh"
				type="checkbox"
				class=""
				on:change={(e) => (isFresh = e.currentTarget.checked)}
			/>
		</div>
		<div class="flex flex-col gap-y-1">
			<label for="expiration_date">Data de Vencimento</label>
			<input name="expiration_date" id="expiration_date" type="date" class="" disabled={isFresh} />
		</div>
		<button type="submit" class="p-4 bg-blue-600 rounded-lg text-gray-100 hover:opacity-50"
			>Adicionar Entrada</button
		>
	</form>
</div>
