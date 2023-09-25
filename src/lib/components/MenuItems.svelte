<script>
    import { ArrowDown, ArrowUp, Box, LayoutDashboard, Settings, UserSquare2 } from "lucide-svelte"

    import SidebarItem from "./SidebarItem.svelte"
    import SidebarSubItem from "./SidebarSubItem.svelte"

    $: expanded = false
</script>

<SidebarItem label="Dashboard" link="/dashboard">
    <LayoutDashboard size={20} slot="icon" />
</SidebarItem>
<SidebarItem label="Inventário" link="/products" {expanded}>
    <Box size={20} slot="icon" />
    <svelte:fragment slot="subitem">
        <SidebarSubItem label="Produtos" link="/products" />
        <SidebarSubItem label="Categorias" link="/categories" />
        <SidebarSubItem label="Marcas" link="/brands" />
        <SidebarSubItem label="Fornecedores" link="/suppliers" />
        <SidebarSubItem label="Unidades" link="/units" />
    </svelte:fragment>
</SidebarItem>
<SidebarItem label="Clientes" link="/customers">
    <UserSquare2 size={20} slot="icon" />
</SidebarItem>
<SidebarItem label="Entradas" link="/input">
    <ArrowUp size={20} slot="icon" />
</SidebarItem>
<SidebarItem label="Saídas" link="/output">
    <ArrowDown size={20} slot="icon" />
</SidebarItem>
<SidebarItem label="Configurações" link="/settings">
    <Settings size={20} slot="icon" />
</SidebarItem>
