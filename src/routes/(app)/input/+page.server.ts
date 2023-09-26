import { redirect, type Actions, error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
    const session = await getSession()
    if (!session) {
        throw redirect(303, "/login")
    }

    const fetchInputs = async () => {
        const { data: inputs, error: err } = await supabase
            .from("inventory")
            .select("*, products(name)")
            .gt("amount", 0)
            .order("created_at", { ascending: false })
            .eq("user", session?.user?.id)

        if (err) {
            console.error(err)
            throw error(500, "Erro ao carregar entradas de inventório")
        }

        return inputs.map((input) => ({ ...input, productName: input.products.name }))
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
        inputs: await fetchInputs(),
        products: await fetchProducts(),
    }
}

export const actions: Actions = {
    default: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()

        if (!session) {
            return { status: 401, body: "Você não está logado" }
        }

        const inputData = Object.fromEntries(await request.formData())

        inputData?.fresh && delete inputData.fresh
        const price = +inputData?.price
        const amount = +inputData?.amount
        const expiration_date =
            inputData?.expiration_date === "" ? null : inputData?.expiration_date
        console.log(expiration_date)
        const { data, error: err } = await supabase
            .from("inventory")
            .insert([{ ...inputData, amount, price, expiration_date, user: session?.user.id }])
            .select()
            .single()

        if (err) {
            console.log(err)
            return { status: 500, body: "Erro ao fazer entrada de inventório" }
        }

        return { status: 200, body: "Entrada de inventório feita com sucesso", data }
    },
}
