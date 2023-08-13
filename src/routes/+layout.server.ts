import { supabase } from "$lib/helpers/supabase"

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {

    const fetchProductsData = async () => {
        const { data, error } = await supabase
            .from('products')
            .select()
        return error ? [] : data
    }
    const fetchDashboardData = async () => {
        const { data, error } = await supabase.rpc('get_product_summary')

        return error ? [] : data
    }
    return {
        products: fetchProductsData(),
        dashboard: fetchDashboardData()
    }
}