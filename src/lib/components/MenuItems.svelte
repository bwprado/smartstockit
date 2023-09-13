<script>
    import { ArrowDown, ArrowUp, Box, LayoutDashboard, Settings, UserSquare2 } from "lucide-svelte"

    import SidebarItem from "./SidebarItem.svelte"
</script>

<SidebarItem label="Dashboard" link="/dashboard">
    <LayoutDashboard size={20} />
</SidebarItem>
<SidebarItem label="Produtos" link="/products">
    <Box size={20} />
</SidebarItem>
<SidebarItem label="Clientes" link="/customers">
    <UserSquare2 size={20} />
</SidebarItem>
<SidebarItem label="Entradas" link="/input">
    <ArrowUp size={20} />
</SidebarItem>
<SidebarItem label="Saídas" link="/output">
    <ArrowDown size={20} />
</SidebarItem>
<SidebarItem label="Configurações" link="/settings">
    <Settings size={20} />
</SidebarItem>
