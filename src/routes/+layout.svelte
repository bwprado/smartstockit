<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-crimson.css'
	import '@skeletonlabs/skeleton/styles/skeleton.css'

	import { page } from '$app/stores'
	import { AppShell } from '@skeletonlabs/skeleton'

	import Header from '$lib/components/Header.svelte'
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'
	import Sidebar from '$lib/components/Sidebar.svelte'

	export let data
</script>

<svelte:head>
	<title>Inventory VT {$page.url.pathname}</title>
</svelte:head>

<AppShell>
	<svelte:fragment slot="header">
		<Header session={data?.session || false} user={data?.user} />
	</svelte:fragment>
	<Breadcrumbs />
	<svelte:fragment slot="sidebarLeft">
		<Sidebar
			navItems={[
				{ label: 'Home', link: '/' },
				{ label: 'Produtos', link: '/products' },
				{ label: 'Entradas', link: '/input' },
				{ label: 'Saídas', link: '/output' },
			]} />
	</svelte:fragment>

	<div class="px-4 lg:px-28">
		<slot />
	</div>
	<svelte:fragment slot="pageFooter">
		<footer class="flex justify-center items-center">
			<p class="text-xl">
				<a href="https://kit.svelte.dev">by Bruno Prado</a> trying to learn SvelteKit
			</p>
		</footer>
	</svelte:fragment>
</AppShell>
