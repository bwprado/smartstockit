import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export interface IProduct { product: string, amount: string, price?: string, fresh?: string, expiration_date?: string }

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
    if (!await getSession()) {
        throw redirect(303, '/login')
    }
};

export const actions: Actions = {
    default: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        const outputData = Object.fromEntries(await request.formData())

        const negativeAmount = -Number(outputData.amount)
        const res = await supabase.from('inventory').insert([{ ...outputData, amount: negativeAmount, user: session?.user?.id, price: 0 }])
    }
};