<script>
    import CompositionItem from "$lib/components/CompositionItem.svelte"
    import Composition from "$lib/components/Composition.svelte"
</script>

<Composition options={[{ value: "sugar", label: "Açucar" }]}>
    <CompositionItem />
</Composition>
