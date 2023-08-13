<script lang="ts">
	interface Dashboard {
		product_name: string;
		product_id: string;
		total_amount: number;
		average_price: number;
	}

	export let data;
	const { products } = data;
	const dashboard = data?.dashboard as Dashboard[];
	let selectedProduct = '' as string;
</script>

<div class="w-1/2 flex flex-col mx-auto">
	<form method="post" class="flex flex-col gap-y-4">
		<div class="flex flex-col gap-y-1">
			<label for="product">Produto</label>
			<select
				name="product"
				id="product"
				class=""
				bind:value={selectedProduct}
				on:change={() => console.log(selectedProduct)}
			>
				{#each products as product}
					<option value={product.id}>{product.name}</option>
				{/each}
			</select>
		</div>
		<div class="flex flex-col gap-y-1">
			<label for="amount">Quantidade</label>
			<input
				name="amount"
				id="amount"
				type="number"
				class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
			/>
		</div>
		<input
			type="hidden"
			name="price"
			value={dashboard.find((item) => item.product_id === selectedProduct)?.average_price}
		/>
		<button type="submit" class="p-4 bg-red-500 rounded-lg text-gray-100 hover:opacity-50"
			>Retirar do Estoque</button
		>
	</form>
</div>
