import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals: { supabase, getSession, getUserProfile } }) => {
    const session = await getSession()

    const fetchProductsData = async () => {
        if (!session) return []

        const { data, error } = await supabase
            .from('products')
            .select()

        return session ? error ? [] : data : []
    }
    const fetchDashboardData = async () => {
        if (!session) return []

        const { data, error } = await supabase.rpc('get_product_summary')

        return error ? [] : data
    }
    return {
        products: fetchProductsData(),
        dashboard: fetchDashboardData(),
        session: getSession(),
        user: getUserProfile()
    }
}