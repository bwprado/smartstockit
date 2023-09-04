<script lang="ts">
    import { createEventDispatcher } from "svelte"

    export let key: string = ""

    const dispatch = createEventDispatcher()
</script>

<tr
    class="table-row cursor-pointer"
    data-key={key}
    on:click={(e) =>
        dispatch("rowClick", {
            key: key,
            row: e.currentTarget,
        })}
>
    <slot />
</tr>
