import { json, type RequestHandler, error } from "@sveltejs/kit"

export const PUT: RequestHandler = async ({ locals: { supabase }, url, request }) => {
    const id = url.searchParams.get("id")
    const { brands, suppliers, units, categories, type, ...body } = await request.json()

    const editProduct = {
        ...body,
        type,
        composition: type === "product" ? body.composition : null,
        brand: body.brand.id,
        category: body.category.id,
        unit: body.unit.id,
        price: +body.price,
        cost: +body.cost,
        supplier: body.supplier.id,
    }

    if (!id) {
        return json({ message: "ID não informado" }, { status: 400 })
    }

    const { data: product, error: err } = await supabase
        .from("products")
        .update({ ...editProduct })
        .eq("id", id)
        .select()
        .single()

    if (err) {
        console.log(err)
        throw error(500, err.message)
    }

    return json(product, { status: 200, statusText: "Produto editado com sucesso" })
}
