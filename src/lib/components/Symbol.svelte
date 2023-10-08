<script>
    import { cx } from "class-variance-authority"
    import { twMerge } from "tailwind-merge"

    let customClass = ""
    export let text = ""
    export { customClass as class }

    const pStyle = cx([
        "p-2",
        "dark:bg-surface-700",
        "dark:text-surface-300",
        "bg-surface-100",
        "text-surface-400",
        "text-xs",
        "h-full",
        "flex",
        "items-center",
        "rounded-s-md",
    ])
</script>

<p class={twMerge(pStyle, customClass)}>
    {text}
</p>
