<script>
    import Chart from "chart.js/auto"
    import { onDestroy, onMount } from "svelte"

    let ctx
    let chart

    onMount(() => {
        chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Bolo de 1Kg", "Açucar Mascavo", "Trigo", "Cookies", "Purple", "Orange"],
                datasets: [
                    {
                        label: "Entrada de produtos",
                        data: [12, 19, 3, 5, 2, 3],
                        borderWidth: 1,
                        borderRadius: 8,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        })
    })
    onDestroy(() => {
        chart.destroy()
    })
</script>

<canvas id="myChart" width="400" height="400" bind:this={ctx}></canvas>
