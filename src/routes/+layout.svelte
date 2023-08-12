<script>
	import './styles.css';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
</script>

<head>
	<title>Inventory VT {$page.url.pathname}</title>
</head>
<div class="grid grid-rows-[max-content,auto,max-content] h-screen">
	<Header />

	<main class="flex justify-center w-full">
		<slot />
	</main>

	<footer class="flex justify-center items-center">
		<p class="text-xl">
			<a href="https://kit.svelte.dev">by Bruno Prado</a> trying to learn SvelteKit
		</p>
	</footer>
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
