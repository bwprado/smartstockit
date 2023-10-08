import { error, redirect } from "@sveltejs/kit"
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
        const { data, error: err } = await supabase
            .from("products")
            .select("id, name")
            .eq("user", session?.user?.id)

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

    