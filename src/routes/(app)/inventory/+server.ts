import { json, type RequestHandler } from "@sveltejs/kit"

export const DELETE: RequestHandler = async ({ locals: { supabase, getSession }, params }) => {
    const session = await getSession()

    if (!session) {
        return json({ message: "Você não está logado" }, { status: 401 })
    }

    const id = params.id as string

    const { data, error: err } = await supabase.from("inventory").delete().eq("id", id).single()

    if (err) {
        console.error(err)
        return json({ message: "Erro ao deletar entrada de inventório" }, { status: 500 })
    }

    return json(data, { status: 200 })
}
