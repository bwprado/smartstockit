<script lang="ts">
	import { page } from '$app/stores'
	import { cva } from 'class-variance-authority'

	export let navItems: { label: string; link: string }[] = []
	$: active = $page.url.pathname
	const linkStyle = cva([], {
		variants: {
			active: {
				true: 'font-bold',
				false: 'font-medium'
			}
		}
	})
</script>

<nav class="bg-gray-200 dark:bg-gray-800 dark:text-gray-200 h-full w-36 my-auto p-4">
	<ul class="flex flex-col gap-y-4">
		{#each navItems as { link, label }}
			<li class={linkStyle({ active: active === link })}>
				<a href={link}>{label}</a>
			</li>
		{/each}
	</ul>
</nav>
