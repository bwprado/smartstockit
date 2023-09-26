<script lang="ts">
    import Chart from "chart.js/auto"
    import { onMount } from "svelte"

    let ctx: HTMLCanvasElement
    let chart: Chart

    onMount(() => {
        chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Bolo de 1Kg", "Açucar Mascavo", "Trigo", "Cookies", "Purple", "Orange"],
                datasets: [
                    {
                        label: "Entrada de produtos",
                        data: [12, 19, 3, 5, 2, 3],
                        borderWidth: 2,
                        borderRadius: 8,
                        backgroundColor: "rgb(212, 22, 60, 0.8)",
                    },
                ],
            },
            options: {
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

<div class="w-full sm:w-1/2">
    <canvas id="myChart" width="400" height="400" bind:this={ctx}></canvas>
</div>
