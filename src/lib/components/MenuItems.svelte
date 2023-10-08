<script>
    import { Box, Clipboard, LayoutDashboard, Settings, UserSquare2 } from "lucide-svelte"
    import { page } from "$app/stores"

    import SidebarItem from "./SidebarItem.svelte"
    import SidebarSubItem from "./SidebarSubItem.svelte"

    $: expanded = false
</script>

<SidebarItem label="Dashboard" link="/dashboard">
    <LayoutDashboard size={20} slot="icon" />
</SidebarItem>
<SidebarItem label="Inventário" link="/inventory" expanded={expanded || $page.url.pathname.includes("/inventory")}>
    <Box size={20} slot="icon" />
    <svelte:fragment slot="subitem">
        <SidebarSubItem label="Entradas" link="/inventory/input" />
        <SidebarSubItem label="Saídas" link="/inventory/output" />
    </svelte:fragment>
</SidebarItem>
<SidebarItem
    label="Cadastros"
    link="/registration"
    expanded={expanded || $page.url.pathname.includes("/registration")}>
    <Clipboard size={20} slot="icon" />
    <svelte:fragment slot="subitem">
        <SidebarSubItem label="Produtos" link="/registration/products" />
        <SidebarSubItem label="Categorias" link="/registration/categories" />
        <SidebarSubItem label="Marcas" link="/registration/brands" />
        <SidebarSubItem label="Fornecedores" link="/registration/suppliers" />
        <SidebarSubItem label="Unidades" link="/registration/units" />
    </svelte:fragment>
</SidebarItem>
<SidebarItem label="Clientes" link="/customers">
    <UserSquare2 size={20} slot="icon" />
</SidebarItem>
<SidebarItem label="Configurações" link="/settings">
    <Settings size={20} slot="icon" />
</SidebarItem>
