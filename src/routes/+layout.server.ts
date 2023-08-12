import { supabase } from "$lib/helpers/supabase"

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {

    const fetchData = async () => {
        const { data, error } = await supabase
            .from('products')
            .select()
        return error ? [] : data
    }

    return {
        products: fetchData()
    }
}