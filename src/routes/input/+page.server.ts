import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
    if (!await getSession()) {
        throw redirect(303, '/login')
    }
};

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const inputData = Object.fromEntries(await request.formData())

        inputData?.fresh && delete inputData.fresh
        await supabase.from('inventory').insert([inputData])
    }
};