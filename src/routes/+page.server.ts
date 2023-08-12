import { supabase } from "$lib/helpers/supabase"
export const load = async () => {

    const fetchData = async () => {

        const { data, error } = await supabase
            .from('inventory')
            .select()

        return error ? [] : data
    }

    return {
        inventory: fetchData()
    }
}