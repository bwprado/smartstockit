import { supabase } from "$lib/helpers/supabase"

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData()
        const productName = formData.get("product")
        const unit = formData.get("unit")
        const id = formData.get("id")

        const { data, error } = await supabase
            .from('products')
            .insert([
                { name: productName, unit, balance: 0 },
            ])
            .select()

        console.log(error)
    }
};