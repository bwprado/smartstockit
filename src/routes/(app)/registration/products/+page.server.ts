import { fail, type Actions } from "@sveltejs/kit"
import type { Brand, Category, Product, Supplier, Unit } from "../../../../types/supabase.js"
import type { PageServerLoad } from "./$types.js"

export const load: PageServerLoad = async ({ locals: { supabase, getSession }, depends }) => {
    const session = await getSession()

    const fetchProducts = async () => {
        depends("products")
        const { data: products, error: errProducts } = await supabase
            .from("products")
            .select(
                "*, units (id, name, acronym), brands (id, name), categories (id, name), suppliers (id, name)",
            )
            .eq("user", session?.user?.id)

        if (errProducts) {
            console.error(errProducts.message)
            return []
        }
        return products as Product[]
    }
    const { data: categories, error: errCategories } = await supabase
        .from("categories")
        .select()
        .eq("user", session?.user?.id)

    if (errCategories) {
        console.error(errCategories.message)
        throw fail(+errCategories.code, { message: errCategories.message })
    }

    const { data: brands, error: errBrands } = await supabase
        .from("brands")
        .select()
        .eq("user", session?.user?.id)

    if (errBrands) {
        console.error(errBrands.message)
        throw fail(+errBrands.code, { message: errBrands.message })
    }

    const { data: units, error: errUnits } = await supabase
        .from("units")
        .select()
        .eq("user", session?.user?.id)

    if (errUnits) {
        console.error(errUnits.message)
        throw fail(+errUnits.code, { message: errUnits.message })
    }

    const { data: suppliers, error: errSuppliers } = await supabase
        .from("suppliers")
        .select()
        .eq("user", session?.user?.id)

    if (errSuppliers) {
        console.error(errSuppliers.message)
        throw fail(+errSuppliers.code, { message: errSuppliers.message })
    }

    return {
        products: await fetchProducts(),
        categories: categories as Category[],
        brands: brands as Brand[],
        suppliers: suppliers as Supplier[],
        units: units as Unit[],
    }
}

export const actions: Actions = {
    addProduct: async ({ request, locals: { supabase } }) => {
        const formData = Object.fromEntries(await request.formData())
        const { data, error: err } = await supabase.from("products").insert([formData]).select()
        if (err) {
            console.error(err.message)
            throw fail(+err.code, { message: err.message })
        }
        return {
            products: data as Product[],
        }
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
            return { error: true, body: "Erro ao editar o produto." }
        }
        return { success: true, body: "Produto editado com sucesso!" }
    },
    search: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            return fail(401, { error: true, body: "Faça login para continuar." })
        }

        const { search } = Object.fromEntries(await request.formData())
        const { data, error: err } = await supabase
            .from("products")
            .select()
            .ilike("name", `%${search}%`)
            .eq("user", session.user.id)
        if (err) {
            console.error(err.message)
            return fail(500, { error: false, body: err.message })
        }
        return { success: true, body: data }
    },
}
