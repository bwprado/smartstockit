import { error, json, type RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ locals: { supabase, getSession }, request }) => {
    const session = await getSession()
    if (!session) {
        return json(401, { statusText: "Não autorizado, por favor refaça o login.", status: 401 })
    }
    const { fresh, ...input } = await request.json()

    const { data, error: err } = await supabase
        .from("inventory")
        .insert([{ ...input, amount: +input.amount, user: session?.user?.id }])
        .eq("user", session?.user?.id)
        .select()
        .single()

    if (err) {
        console.log(err)
        throw error(500, { message: `Erro ao inserir produto no estoque - ${err?.message}` })
    }

    return json(data, { status: 201, statusText: "Entrada de produto registrada com sucesso." })
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
