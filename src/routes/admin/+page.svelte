<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const users = data?.users ?? [];
</script>

<svelte:head>
	<title>Inventory - VT / Admin</title>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" />
</svelte:head>
<div class="w-fit flex flex-col gap-y-2 mx-auto p-8">
	<table class="table-auto">
		<thead>
			<tr class="text-left">
				<th class="p-2">#</th>
				<th class="p-2">Nome</th>
				<th class="p-2">Email</th>
				<th class="p-2">Tipo</th>
				<th class="p-2" />
				<th class="p-2" />
			</tr>
		</thead>
		<tbody>
			{#if users?.length > 0}
				{#each users as user, index}
					<tr>
						<td class="p-2">{index}</td>
						<td class="w-max whitespace-nowrap">{user?.name}</td>
						<td class="p-2">{user?.email}</td>
						<td class="p-2">{user?.role}</td>
						<td class="p-2">
							<a href="/admin/users/edit/{user?.id}">
								<i class="mi mi-edit"><span class="u-sr-only" />Editar </i>
							</a>
						</td>
						<td class="p-2">
							<a href="/admin/users/remove/{user?.id}">
								<i class="mi mi-delete"><span class="u-sr-only">Remover</span></i>
							</a>
						</td>
					</tr>
				{/each}
			{:else}
				<tr>Nenhum usuário encontrado</tr>
			{/if}
		</tbody>
	</table>
</div>
