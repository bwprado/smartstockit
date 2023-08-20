<script lang="ts">
	export let columns: string[] = [];
</script>

<div class="overflow-x-auto rounded-lg">
	<table class="text-left">
		<thead class="bg-gray-300">
			<tr>
				{#each columns as column}
					<th scope="col" class="px-6 py-3">{column}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			<slot />
		</tbody>
	</table>
</div>
