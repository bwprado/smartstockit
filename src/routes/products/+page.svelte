<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Select from '$lib/components/Select.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableCell from '$lib/components/Table/TableCell.svelte';
	import TableCellHead from '$lib/components/Table/TableCellHead.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';

	export let data;
	$: showModal = false;
	const products = data?.products || [];
</script>

<div class="flex flex-col gap-y-10 w-full">
	<section>
		<form
			method="POST"
			class="grid grid-cols-3 gap-x-4 py-4 px-6 items-center justify-center bg-slate-300 w-full text-gary"
		>
			<Input label="Nome" name="name" type="text" />
			<Select label="Unidade" name="unit" options={['und', 'kg', 'litro']} id="unit" />
			<Button type="submit" id="add_product">Adicionar</Button>
		</form>
	</section>

	<section>
		<h1 class="text-2xl font-bold">Lista de Produtos</h1>
	</section>

	<section class="flex flex-col gap-y-4 w-full items-center">
		<Table columns={['Nome', 'Unidade', 'Saldo']}>
			{#each products as product, index}
				<TableRow>
					<TableCellHead>
						{product?.name}
					</TableCellHead>
					<TableCell>
						{product?.unit}
					</TableCell>
					<TableCell>
						{product?.balance}
					</TableCell>
				</TableRow>
			{/each}
		</Table>
	</section>
</div>

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
