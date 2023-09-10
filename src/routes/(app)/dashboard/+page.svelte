<script>
    import Chart from "$lib/components/Chart.svelte"
    import PageHeader from "$lib/components/PageHeader.svelte"

    export let data
</script>

<div class="flex flex-col gap-y-10 w-full">
    <PageHeader title="Dashboard"></PageHeader>
    <Chart />
</div>
