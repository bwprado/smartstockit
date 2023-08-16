<script lang="ts">
	import { page } from '$app/stores';
	export let session: any;
</script>

<header class="flex h-10 w-full bg-gray-800 items-center text-gray-200 justify-between p-4">
	<div class="">InventoryVT</div>

	<nav class="align-middle">
		<ul class="flex gap-x-6">
			<li aria-current={$page.url.pathname === '/dashboard' ? 'page' : undefined}>
				<a href="/dashboard">Dashboard</a>
			</li>
			<li aria-current={$page.url.pathname === '/products' ? 'page' : undefined}>
				<a href="/products">Products</a>
			</li>
			<li aria-current={$page.url.pathname === '/input' ? 'page' : undefined}>
				<a href="/input">Input</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/outupt') ? 'page' : undefined}>
				<a href="/output">Output</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/login')}>
				<a href={session ? '/logout' : '/login'}>{session ? 'Logout' : 'Login'}</a>
			</li>
		</ul>
	</nav>
</header>
