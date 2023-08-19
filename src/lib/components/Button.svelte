<script lang="ts">
	export let type: import('svelte/elements').HTMLButtonAttributes['type'] = 'button';
	export let id: string = '';
	export let onClick: () => void = () => {};
	export let href: HTMLAnchorElement['href'] = '';
</script>

{#if href}
	<a {href}>
		<button
			{type}
			{id}
			class="rounded-lg bg-blue-600 text-gray-100 font-bold p-3 flex items-center justify-center"
			on:click={onClick}
		>
			<slot />
		</button>
	</a>
{:else}
	<button
		type="submit"
		class="rounded-lg bg-blue-600 text-gray-100 font-bold p-3 flex items-center justify-center"
	>
		<slot />
	</button>
{/if}
