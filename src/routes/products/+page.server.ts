import { redirect, type Actions, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
    if (!await getSession()) {
        throw redirect(303, '/login')
    }
};

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const formData = Object.fromEntries(await request.formData())

        const { data, error: err } = await supabase
            .from('products')
            .insert([formData])
            .select()

        if (err) {
            console.error(err.message)
            throw error(+err.code, err.message)
        }
    }
};