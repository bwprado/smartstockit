import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()
    console.log(session)
    const fetchProductsData = async () => {
        console.log('fetching products')
        const { data, error } = await supabase
            .from('products')
            .select()
        return error ? [] : data
    }
    const fetchDashboardData = async () => {
        console.log('fetching summary')
        const { data, error } = await supabase.rpc('get_product_summary')

        return error ? [] : data
    }
    return {
        products: fetchProductsData(),
        dashboard: fetchDashboardData(),
        session: getSession()
    }
}