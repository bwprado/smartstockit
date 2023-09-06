import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
    if (!await getSession()) {
        throw redirect(303, '/login')
    }

    const { data: outputs, error: err } = await supabase
        .from('inventory')
        .select('*, products(name)')
        .lt('amount', 0)
        .order('created_at', { ascending: false })

    if (err) {
        throw err
    }

    return {
        outputs: outputs.map(input => ({ ...input, productName: input.products.name }))
    }
};


export const actions: Actions = {
    default: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        const outputData = Object.fromEntries(await request.formData())

        const negativeAmount = -Number(outputData.amount)
        const { data, error: err } = await supabase.from('inventory').insert([{ ...outputData, amount: negativeAmount, user: session?.user?.id }])

        if (err) {
            console.log(err)
            return { status: 500, body: "Erro ao fazer retirada do estoque" }
        }

        return { status: 303, body: "Produto retirado com sucesso." }
    }
};