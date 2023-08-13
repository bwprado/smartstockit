import { supabase } from '$lib/helpers/supabase.js';

export interface IProduct { product: string, amount: string, price?: string, fresh?: string, expiration_date?: string }

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData()
        const allData = [...data.entries()]
        let outputData: IProduct = { product: '', amount: '' }
        type T = keyof typeof outputData

        for (const [key, value] of allData) {
            outputData[key as T] = value as string
        }
        const negativeAmount = -Number(outputData.amount)
        const res = await supabase.from('inventory').insert([{ ...outputData, amount: negativeAmount }])
    }
};