<script lang="ts">
    import Chart, { type ChartDataset } from "chart.js/auto"
    import { onMount } from "svelte"

    export let labels: string[] = []
    export let datasets: ChartDataset[] = []
    export let type: "bar" | "line" | "pie" | "doughnut" = "bar"

    let ctx: HTMLCanvasElement
    let chart: Chart

    onMount(() => {
        chart = new Chart(ctx, {
            type,
            data: {
                labels,
                datasets,
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        })
    })
</script>

{#if labels.length === 0}
    <div>
        <p class="text-center text-gray-500">No data to display</p>
    </div>
{:else}
    <canvas id="myChart" width="400" height="400" bind:this={ctx}></canvas>
{/if}

