import { error, type Actions } from "@sveltejs/kit"
import type { Category, Product } from "../../../types/supabase.js"
import type { PageServerLoad } from "./$types.js"
import { invalidate } from "$app/navigation"

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()
    const { data: products, error: errProducts } = await supabase
        .from("products")
        .select()
        .eq("id", session?.user?.id)

    if (errProducts) {
        console.error(errProducts.message)
        throw error(+errProducts.code, errProducts.message)
    }

    const { data: categories, error: errCategories } = await supabase
        .from("categories")
        .select()
        .eq("user", session?.user?.id)

    if (errCategories) {
        console.error(errCategories.message)
        throw error(+errCategories.code, errCategories.message)
    }

    return {
        products: products as Product[],
        categories: categories as Category[],
    }
}

export const actions: Actions = {
    addProduct: async ({ request, locals: { supabase } }) => {
        const formData = Object.fromEntries(await request.formData())
        const { data, error: err } = await supabase.from("products").insert([formData]).select()
        if (err) {
            console.error(err.message)
            throw error(+err.code, err.message)
        }
        invalidate("/products")
    },
    editProduct: async ({ request, locals: { supabase } }) => {
        const formData = Object.fromEntries(await request.formData())
        const { id, name, unit } = formData as Partial<Product>

        const { data, error: err } = await supabase
            .from("products")
            .update({ name, unit })
            .eq("id", id)
            .select()

        if (err) {
            return { status: +err.code, body: "Erro ao editar o produto." }
        }
        return { status: 200, body: "Produto editado com sucesso!" }
    },
}
