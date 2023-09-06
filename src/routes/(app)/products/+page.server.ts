import { redirect, type Actions, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import type { IProduct } from '../proxy+layout.server.js';

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
    if (!await getSession()) {
        throw redirect(303, '/login')
    }
};

export const actions: Actions = {
    addProduct: async ({ request, locals: { supabase } }) => {
        const formData = Object.fromEntries(await request.formData())

        const { data, error: err } = await supabase
            .from('products')
            .insert([formData])
            .select()

        if (err) {
            console.error(err.message)
            throw error(+err.code, err.message)
        }
    },
    editProduct: async ({ request, locals: { supabase } }) => {
        const formData = Object.fromEntries(await request.formData())
        const { id, name, unit } = formData as Partial<IProduct>

        const { data, error: err } = await supabase
            .from('products')
            .update({ name, unit })
            .eq('id', id)
            .select()
        
        if (err) {
            return { status: +err.code, body: "Erro ao editar o produto." }
        }
        return { status: 200, body: "Produto editado com sucesso!" }
    }
};