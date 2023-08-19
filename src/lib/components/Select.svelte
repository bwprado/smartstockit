<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { cx } from 'class-variance-authority';

	export let label: string = 'Label';
	export let customClasses: {
		wrapper?: string;
		label?: string;
		select?: string;
	} = {};
	export let type: string = 'text';
	export let name: string = 'input';
	export let id: string = 'input';
	export let options: string[] = [];
	const selectStyle = cx([
		'block',
		'w-full',
		'rounded-md',
		'border-0',
		'py-1.5',
		'pl-7',
		'pr-20',
		'text-gray-900',
		'ring-1',
		'ring-inset',
		'ring-gray-300',
		'placeholder:text-gray-400',
		'focus:ring-2',
		'focus:ring-inset',
		'focus:ring-indigo-600',
		'sm:text-sm',
		'sm:leading-6',
		'outline-none'
	]);
</script>

<div class={twMerge('w-full flex flex-col py-4', customClasses.wrapper)}>
	<label
		for={name}
		class={twMerge('block text-sm font-medium leading-6 text-gray-900', customClasses.label)}
		>{label}</label
	>
	<select {type} {name} {id} class={twMerge(selectStyle, customClasses.select)}>
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
</div>
