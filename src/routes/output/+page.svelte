<script lang="ts">
	import type { PageData } from './$types';
	interface Dashboard {
		product_id: string;
		product_name: string;
		average_price: number;
		total_amount: number;
	}

	export let data: PageData;
	const products = data?.products || [];
	const dashboard: Dashboard[] = data?.dashboard || [];
	let selectedProduct = '' as string;
	const averagePrice =
		dashboard.length > 0 &&
		dashboard?.find((item) => item?.product_id === selectedProduct)?.average_price;
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
		<input type="hidden" name="price" value={averagePrice} />
		<button type="submit" class="p-4 bg-red-500 rounded-lg text-gray-100 hover:opacity-50"
			>Retirar do Estoque</button
		>
	</form>
</div>
