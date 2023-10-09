import { error, json, type RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ locals: { supabase, getSession }, request }) => {
    const session = await getSession()
    if (!session) {
        return json(401, { statusText: "Não autorizado, por favor refaça o login.", status: 401 })
    }
    const { fresh, ...input } = await request.json()

    const { data: product, error: errProduct } = await supabase
        .from("products")
        .select("composition")
        .eq("id", input.product)
        .single()

    if (errProduct) {
        console.log(errProduct)
        throw error(500, { message: `Erro ao buscar produto - ${errProduct?.message}` })
    }

    const insert = [
        { ...input, amount: +input.amount, user: session?.user?.id, price: +input.price || 0 },
        ...product.composition.map((item: any) => ({
            product: item.value,
            price: item?.price || 0,
            amount: -item.amount * +input.amount,
            user: session?.user?.id,
        })),
    ]

    const { data, error: err } = await supabase
        .from("inventory")
        .insert(insert)
        .eq("user", session?.user?.id)
        .select()

    if (err) {
        console.log(err)
        throw error(500, { message: `Erro ao inserir produto no estoque - ${err?.message}` })
    }
    return json(data[0], { status: 201, statusText: "Entrada de produto registrada com sucesso." })
}

export const DELETE: RequestHandler = async ({ locals: { supabase, getSession }, request }) => {
    const session = await getSession()
    if (!session) {
        return json(401, { statusText: "Não autorizado, por favor refaça o login.", status: 401 })
    }
    const id = await request.json()
    const { data, error: err } = await supabase
        .from("inventory")
        .delete()
        .eq("id", id)
        .eq("user", session.user.id)
        .select()
        .single()

    if (err) {
        console.log(err)
        throw error(500, { message: `Erro ao deletar produto do estoque - ${err?.message}` })
    }

    return json(data, { status: 200, statusText: "Produto deletado com sucesso." })
}
