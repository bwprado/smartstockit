<script lang="ts">
	import { page } from '$app/stores';
	import { capitalize } from 'lodash';

	$: myBreadcrumbs = $page.url.pathname
		.split('/')
		.filter((crumb) => crumb !== '')
		.map((crumb) => capitalize(crumb));
</script>

<div class="h-10 w-full flex items-center justify-start px-4 lg:px-28">
	<ul class="flex gap-x-4">
		{#each myBreadcrumbs as crumb, i}
			{#if i < myBreadcrumbs.length - 1}
				<li class="crumb"><a class="anchor" href={$page.url.pathname}>{crumb}</a></li>
				<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			{:else}
				<li class="crumb font-bold"><a href="/">Home</a></li>
				<li class="crumb-separator" aria-hidden>&rsaquo;</li>
				<li class="crumb">{crumb}</li>
			{/if}
		{/each}
	</ul>
</div>
