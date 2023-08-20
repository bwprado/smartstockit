<script lang="ts">
	import { page } from '$app/stores'
	import { LightSwitch, modeCurrent, setModeCurrent } from '@skeletonlabs/skeleton'
	export let session: any
	export let user: any
</script>

<header
	class="flex h-max w-full bg-gray-800 items-center text-gray-200 justify-between py-4 lg:px-28 px-4">
	<div class="">
		<a href="/">InventoryVT</a>
	</div>
	<nav class="align-middle">
		<ul class="flex gap-x-6">
			{#if session && user?.role === 'admin'}
				<li aria-current={$page.url.pathname === '/admin' ? 'page' : undefined}>
					<a href="/admin">Admin</a>
				</li>
			{/if}
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

			<LightSwitch on:click={() => setModeCurrent($modeCurrent ? true : false)} />
		</ul>
	</nav>
</header>
