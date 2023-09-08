import type { LayoutServerLoad } from "./$types"

export interface IProduct {
    name: string
    id: string
    balance: number
    unit: string
    created_at: string
}
export interface IDashboard {
    product_name: string
    total_amount: number
    average_price: number
    last_entry: string
}

export const load: LayoutServerLoad = async ({ locals: { supabase, getSession, getUserProfile } }) => {
    const session = await getSession()


    const fetchProductsData = async (): Promise<IProduct[]> => {
        if (!session) return []

        const { data, error } = await supabase
            .from('products')
            .select()
            .eq('user', session.user.id)
            
        return session ? error ? [] : data : []
    }
    const fetchDashboardData = async (): Promise<IDashboard[]> => {

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