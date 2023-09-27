import { error, json, type RequestHandler } from "@sveltejs/kit"

export const PUT: RequestHandler = async ({ locals: { supabase, getSession }, request }) => {
    const session = await getSession()
    if (!session) {
        console.log("No session")
        throw error(401, { message: "Unauthorized" })
    }

    const { id, name } = await request.json()

    const { data, error: err } = await supabase
        .from("categories")
        .update({ name })
        .eq("id", id)
        .select()

    if (err) {
        console.log(err)
        throw error(500, { message: err.message })
    }

    return json(data, {
        status: 200,
        statusText: "Categoria atualizada com sucesso",
    })
}

export const POST: RequestHandler = async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession()

    if (!session) {
        console.log("No session")
        throw error(401, { message: "Unauthorized" })
    }

    const { name } = (await request.json()) || {}

    const { data, error: err } = await supabase
        .from("categories")
        .insert({ name, user: session.user?.id })
        .eq("user", session.user?.id)
        .select()
        .single()

    if (err) {
        console.log(err)
        return json({ err }, { status: 500 })
    }

    return json(data, { status: 202, statusText: "Categoria adicionada com sucesso" })
}
