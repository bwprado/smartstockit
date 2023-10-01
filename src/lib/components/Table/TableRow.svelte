<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import { fly, slide } from "svelte/transition"

    export let key: string = ""

    const dispatch = createEventDispatcher()
</script>

<tr
    in:fly={{ y: 20 }}
    out:slide
    class="table-row cursor-pointer"
    data-key={key}
    on:click={(e) =>
        dispatch("rowClick", {
            key: key,
            row: e.currentTarget,
        })}>
    <slot />
</tr>
