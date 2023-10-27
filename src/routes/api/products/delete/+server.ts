import { json, type RequestHandler } from "@sveltejs/kit"

export const DELETE: RequestHandler = async ({ locals: { supabase, getSession }, url }) => {
    const session = await getSession()

    if (!session) {
        return json(
            { message: "Usuário não autenticado" },
            { status: 401, statusText: "Usuário não autenticado" },
        )
    }

    const id = url.searchParams.get("id")

    if (!id) {
        return json(
            { message: "ID não informado" },
            { status: 400, statusText: "ID não informado" },
        )
    }

    const { data: product, error } = await supabase
        .from("products")
        .delete()
        .eq("id", id)
        .eq("user", session.user.id)
        .select()
        .single()

    if (error) {
        return json(error, { status: 500, statusText: error.message })
    }

    return json(product, { status: 200, statusText: "Produto removido com sucesso." })
}
