<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { cx } from 'class-variance-authority';

	export let label: string = 'Label';
	export let customClasses: {
		wrapper?: string;
		label?: string;
		input?: string;
	} = {};
	export let type: string = 'text';
	export let name: string = 'input';
	export let id: string = 'input';
	const inputStyle = cx([
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
	<input {type} {name} {id} class={twMerge(inputStyle, customClasses.input)} />
</div>