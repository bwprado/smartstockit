<script lang="ts">
    import { cva } from "class-variance-authority"
    import { format, parseISO } from "date-fns"
    import TableCell from "./TableCell.svelte"
    import TableCellHead from "./TableCellHead.svelte"
    import TableRow from "./TableRow.svelte"

    export let columns: { label: string; sort?: string, type: string }[] = []
    export let data: any[] = []
    export let index: number = 0
    let direction: "up" | "down" = "down"
    $: direction
    $: sorting = columns[0].sort

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)

    const checkType = (value: any) => {
        if (typeof value === "string") {
            return value
        }
        if (typeof value === "number") {
            return formatCurrency(value)
        }
        if (typeof value === "object") {
            if (typeof value?.getMonth === "function") {
                return format(parseISO(value), "dd/MM/yy 'às' HH:mm:ss")
            }
            return ""
        }
        return "Não informado"
    }

    const handleSort = (sortBy: string = "", direction: string) => {
        if (!sortBy) return
        data = data.sort((a, b) => {
            if (typeof a[sortBy] === "number") {
                return direction === "down" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
            }
            if (typeof a[sortBy] === "object" || typeof b[sortBy] === "object") {
                if (typeof a[sortBy]?.getMonth === "function") {
                    return direction === "down"
                        ? parseISO(a[sortBy]).getTime() - parseISO(b[sortBy]).getTime()
                        : parseISO(b[sortBy]).getTime() - parseISO(a[sortBy]).getTime()
                }
                return 0
            }
            if (typeof a[sortBy] === "string") {
                return direction === "down"
                    ? a[sortBy].localeCompare(b[sortBy])
                    : b[sortBy].localeCompare(a[sortBy])
            }
            return 0
        })
    }

    const thStyle = cva(["px-4", "py-3"], {
        variants: {
            direction: {
                up: "table-sort-asc",
                down: "table-sort-dsc",
                no: "",
            },
        },
    })
</script>

<div class="overflow-x-auto rounded-md table">
    <table class="text-left">
        <thead class="whitespace-nowrap">
            <tr>
                {#each columns as column}
                    <th
                        scope="col"
                        class={thStyle({ direction: sorting === column.label ? direction : "no" })}
                    >
                        {#if column.sort}
                            <button
                                class="hover:opacity-90"
                                on:click={() => {
                                    handleSort(column.sort, direction)
                                    direction = direction === "down" ? "up" : "down"
                                    sorting = column.label
                                }}
                            >
                                {column.label}
                            </button>
                        {:else}
                            {column.label}
                        {/if}
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each data as input}
                <TableRow>
                    {#each columns as col, i}
                        {#if i === index}
                            <TableCellHead>
                                {col?.sort ? checkType(input[col.sort]) : ""}
                            </TableCellHead>
                        {:else}
                            <TableCell>
                                {col?.sort ? checkType(input[col.sort]) : ""}
                            </TableCell>
                        {/if}
                    {/each}
                </TableRow>
            {/each}
        </tbody>
    </table>
</div>
