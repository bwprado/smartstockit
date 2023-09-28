import { json, type RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ locals: { supabase, getSession }, request }) => {
    const session = await getSession()
    if (!session) {
        console.log("No session, please login to continue.")
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
    }

    const body = JSON.parse(await request.text())

    const { data, error } = await supabase
        .from("brands")
        .insert({ name: body.name, user: session.user.id })
        .eq("user", session.user.id)
        .select()
        .single()

    if (error) {
        console.log(error)
        return json({ error }, { status: 500 })
    }

    return json(data, {
        status: 202,
        statusText: "Marca adicionada com sucesso",
    })
}

export const DELETE: RequestHandler = async ({ locals: { supabase, getSession }, request }) => {
    const session = await getSession()
    if (!session) {
        console.log("No session, please login to continue.")
        return json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await request.json()

    const { data, error: err } = await supabase
        .from("brands")
        .delete()
        .eq("id", id)
        .eq("user", session.user.id)
        .select()
        .single()

    if (err) {
        console.log(err)
        return json({ error: err }, { status: 500 })
    }

    return json(data, { status: 202, statusText: "Marca deletada com sucesso" })
}

export const PUT: RequestHandler = async ({ locals: { supabase, getSession }, request }) => {
    const session = await getSession()
    if (!session) {
        console.log("No session, please login to continue.")
        return json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, id } = await request.json()

    const { data, error } = await supabase
        .from("brands")
        .update({ name })
        .eq("id", id)
        .eq("user", session.user.id)
        .select()
        .single()

    if (error) {
        console.log(error)
        return json({ error }, { status: 500 })
    }

    return json(data, { status: 202, statusText: "Marca atualizada com sucesso" })
}
