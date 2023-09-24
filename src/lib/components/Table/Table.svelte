<script lang="ts">
    import { cva } from "class-variance-authority"
    import { format, parseISO } from "date-fns"
    import TableCell from "./TableCell.svelte"
    import TableCellHead from "./TableCellHead.svelte"
    import TableRow from "./TableRow.svelte"
    import { get } from "lodash"

    export let columns: { label: string; key?: string; type: string }[] = []
    export let data: any[] = []
    export let index: number = 0
    export let handleRowClick: (id: string) => void = () => {}
    let direction: "up" | "down" = "down"
    $: direction
    $: sorting = columns[0].key

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)

    const checkType = (value: any, type: string) => {
        if (type === "string") {
            return value || "-"
        }
        if (type === "number") {
            return +value
        }
        if (type === "currency") {
            return formatCurrency(value)
        }
        if (type === "date") {
            if (value === null || value === undefined || value === "") return "-"
            return format(parseISO(value), "dd/MM/yy 'às' HH:mm:ss")
        }
        return "-"
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

    const thStyle = cva([], {
        variants: {
            direction: {
                up: "table-sort-asc",
                down: "table-sort-dsc",
                no: "",
            },
            responsive: {
                true: "hidden sm:block",
                false: "",
            },
        },
    })

    type ClickRowEvent = CustomEvent<{
        key: string
        row: HTMLTableRowElement
    }>

    const handleRowClickEvent = (event: ClickRowEvent) => {
        const { key } = event?.detail
        if (key) {
            handleRowClick(key)
        } else {
            console.error("Key not found")
        }
    }
</script>

<table class="w-full text-left table rounded-md text-sm">
    <thead class="whitespace-nowrap">
        <tr>
            {#each columns as column, i}
                <th
                    scope="col"
                    class={thStyle({
                        direction: sorting === column.label ? direction : "no",
                        responsive: i === columns.length - 1,
                    })}>
                    {#if column.key}
                        <button
                            class="hover:opacity-90"
                            on:click={() => {
                                handleSort(column.key, direction)
                                direction = direction === "down" ? "up" : "down"
                                sorting = column.label
                            }}>
                            {column.label}
                        </button>
                    {:else}
                        {column.label}
                    {/if}
                </th>
            {/each}
        </tr>
    </thead>
    <tbody id="tbody">
        {#each data as input}
            <TableRow key={input.id} on:rowClick={handleRowClickEvent}>
                {#each columns as col, i}
                    {#if i === index}
                        <TableCellHead>
                            {col?.key ? checkType(get(input, col.key), col.type) : ""}
                        </TableCellHead>
                    {:else}
                        <TableCell customClass={i === columns.length - 1 ? "hidden sm:block" : ""}>
                            {col?.key ? checkType(get(input, col.key), col.type) : ""}
                        </TableCell>
                    {/if}
                {/each}
            </TableRow>
        {/each}
    </tbody>
</table>

<style>
</style>
