import { redirect, type Actions, error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types.js"
import type { Product } from "../../../types/supabase.js"

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
    const session = await getSession()
    if (!session) {
        throw redirect(303, "/login")
    }

    const fetchOutputs = async () => {
        const { data: outputs, error: err } = await supabase
            .from("inventory")
            .select("*, products(name)")
            .order("created_at", { ascending: false })
            .eq("user", session?.user?.id)

        if (err) {
            console.log(err)
            throw error(500, "Erro ao buscar saídas do estoque")
        }

        return outputs.map((input) => ({ ...input, productName: input.products.name }))
    }

    const fetchProducts = async () => {
        const { data: products, error: err } = await supabase
            .from("products")
            .select()
            .eq("user", session?.user?.id)

        if (err) {
            throw error(500, "Erro ao buscar produtos")
        }

        return products as Product[]
    }

    return {
        outputs: [],
        products: [],
    }
}

export const actions: Actions = {
    default: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        const outputData = Object.fromEntries(await request.formData())

        const negativeAmount = -Number(outputData.amount)
        const { data, error: err } = await supabase
            .from("inventory")
            .insert([{ ...outputData, amount: negativeAmount, user: session?.user?.id, price: 0 }])
            .eq("user", session?.user?.id)
            .select()
            .single()

        if (err) {
            console.log(err)
            throw error(500, { message: `Erro ao inserir saída no estoque - ${err?.message}` })
        }

        return { status: 303, body: "Produto retirado com sucesso.", data }
    },
}
