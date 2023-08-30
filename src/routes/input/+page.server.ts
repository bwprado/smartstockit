import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
    if (!await getSession()) {
        throw redirect(303, '/login')
    }

    const { data: inputs, error: err } = await supabase
        .from('inventory')
        .select('*, products(name)')
        .gt('amount', 0)
        .order('created_at', { ascending: false })

    if (err) {
        console.error(err)
        throw err
    }

    return {
        inputs: inputs.map(input => ({ ...input, productName: input.products.name }))
    }
};

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const inputData = Object.fromEntries(await request.formData())
        console.log(inputData)

        inputData?.fresh && delete inputData.fresh
        const { data, error: err } = await supabase.from('inventory').insert([inputData])

        if (err) {
            console.error(err)
            throw err
        }

    }
}