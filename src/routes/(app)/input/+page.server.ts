import { redirect, type Actions, error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
    if (!(await getSession())) {
        throw redirect(303, "/login")
    }

    const { data: inputs, error: err } = await supabase
        .from("inventory")
        .select("*, products(name)")
        .gt("amount", 0)
        .order("created_at", { ascending: false })

    if (err) {
        console.error(err)
        throw error(500, "Erro ao carregar entradas de inventório")
    }

    const fetchProducts = async () => {
        const { data, error: err } = await supabase.from("products").select("id, name")

        if (err) {
            console.error(err)
            throw error(500, "Erro ao carregar produtos")
        }

        return data
    }

    return {
        inputs: inputs.map((input) => ({ ...input, productName: input.products.name })),
        products: await fetchProducts(),
    }
}

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const inputData = Object.fromEntries(await request.formData())

        inputData?.fresh && delete inputData.fresh
        const price = +inputData?.price
        const amount = +inputData?.amount
        const expiration_date =
            inputData?.expiration_date === "" ? null : inputData?.expiration_date
        console.log(expiration_date)
        const { data, error: err } = await supabase
            .from("inventory")
            .insert([{ ...inputData, amount, price, expiration_date }])
            .select()
            .single()

        if (err) {
            console.log(err)
            return { status: 500, body: "Erro ao fazer entrada de inventório" }
        }

        return { status: 200, body: "Entrada de inventório feita com sucesso" }
    },
}
