import { supabase } from '$lib/helpers/supabase.js';

export interface IProduct { product: string, amount: string, price: string, fresh?: string, expiration_date?: string }

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData()
        const allData = [...data.entries()]
        let inputData: IProduct = { product: '', amount: '', price: '' }
        type T = keyof typeof inputData

        for (const [key, value] of allData) {
            inputData[key as T] = value as string
        }

        inputData?.fresh && delete inputData.fresh
        const res = await supabase.from('inventory').insert([inputData])
    }
};