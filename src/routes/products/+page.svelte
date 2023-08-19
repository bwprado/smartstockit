<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Input from '$lib/components/Input.svelte';
	import Select from '$lib/components/Select.svelte';
	import { Edit } from 'lucide-svelte';

	export let data;
	$: showModal = false;
	const products = data?.products || [];
</script>

<section class="flex flex-col gap-y-4 w-full items-center">
	<form
		method="POST"
		class="grid grid-cols-3 gap-x-4 py-4 px-6 items-center justify-center bg-slate-300 w-full text-gary"
	>
		<Input label="Nome" name="product_name" type="text" />
		<Select label="Unidade" name="unit" options={['und', 'kg', 'litro']} id="unit" />
		<button
			type="submit"
			class="px-4 py-2 font-bold bg-blue-600 rounded-lg text-gray-100 hover:opacity-50"
			>+ Produto</button
		>
	</form>
	<table class="table-auto w-1/2">
		<thead>
			<tr class="text-left">
				<th>Index</th>
				<th>Nome</th>
				<th>Unidade</th>
				<th>Saldo</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#if products?.length > 0}
				{#each products as product, index}
					<tr>
						<td>{index}</td>
						<td>{product?.name}</td>
						<td>{product?.unit}</td>
						<td>{product?.balance}</td>
						<td class="w-max">
							<button class="flex items-center justify-center" on:click={() => (showModal = true)}
								><Edit />
							</button>
						</td>
					</tr>
				{/each}
			{:else}
				<tr>Nenhum produto encontrado</tr>
			{/if}
		</tbody>
	</table>
</section>

<Modal bind:showModal>
	<div slot="header" class="text-xs text-gray-900 p-2">Editar Produto</div>
	<div slot="body" class="w-full">
		<Input label="Nome" name="product_name" />
	</div>
	<div slot="footer" class="flex w-full gap-x-4 justify-between py-4">
		<button class="p-2 rounded-lg bg-gray-300 w-full" on:click={() => (showModal = false)}
			>Cancelar</button
		>
		<button class="p-2 rounded-lg bg-blue-600 text-white w-full">Salvar</button>
	</div>
</Modal>
