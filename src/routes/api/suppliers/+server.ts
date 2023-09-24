import { json, type RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ locals: { supabase, getSession }, request }) => {
    const session = await getSession()

    if (!session) {
        console.log("Unauthorized")
        return json({ message: "Unauthorized" }, { status: 401 })
    }

    const { name } = await request.json()

    const { data, error: err } = await supabase
        .from("suppliers")
        .insert({ name, user: session.user?.id })
        .select()
        .single()

    if (err) {
        console.log(err)
        return json({ err }, { status: 500 })
    }

    return json({ data }, { status: 202, statusText: "Fornecedor adicionado com sucesso" })
}
