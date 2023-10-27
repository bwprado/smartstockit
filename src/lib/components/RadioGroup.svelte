<script lang="ts">
    import { twMerge } from "tailwind-merge"

    export let options: { label: string; value: string }[] = [
        { label: "Option 1", value: "option-1" },
    ]
    export let label: string = ""
    export let name: string = "radio"
    export let selected: string = options[0].value
    let className: string = ""
    export { className as class }
</script>

<div class="flex flex-col gap-y-2 w-full">
    {#if label}
        <label
            for={name}
            class={twMerge(
                "block text-sm leading-6 text-gray-900 font-bold dark:text-gray-200",
                className,
            )}>{label}</label>
    {/if}
    <div class="flex gap-x-10 w-full">
        {#each options as option, i}
            <label
                for={option.label}
                class="flex gap-x-3 items-center justify-center cursor-pointer group">
                <input
                    bind:group={selected}
                    checked={i === 0}
                    {name}
                    class={twMerge(
                        "radio dark:checked:accent-primary-500 dark:accent-surface-700 accent-primary-500",
                        className,
                    )}
                    type="radio"
                    id={option.label}
                    value={option.value} />
                <p class="text-surface-900 dark:text-white text-sm dark:hover:text-primary-500">
                    {option.label}
                </p>
            </label>
        {/each}
    </div>
</div>
