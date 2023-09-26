import { json, type RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ locals: { supabase, getSession }, request }) => {
    const session = await getSession()

    if (!session) {
        console.log("Unauthorized")
        return json({ message: "Unauthorized" }, { status: 401 })
    }

    const { name, acronym } = await request.json()

    const { data, error: err } = await supabase
        .from("units")
        .insert({ name, acronym, user: session.user?.id })
        .select()
        .single()

    if (err) {
        console.log(err)
        return json({ err }, { status: 500 })
    }

    return json(data, { status: 202, statusText: "Unidade adicionada com sucesso" })
}

export const PUT: RequestHandler = async ({ locals: { supabase, getSession }, request }) => {
    const session = await getSession()
    if (!session) {
        console.log("No session, please login to continue.")
        return json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, id, acronym } = await request.json()

    const { data, error } = await supabase
        .from("units")
        .update({ name, acronym })
        .eq("id", id)
        .eq("user", session.user.id)
        .select()
        .single()

    if (error) {
        console.log(error)
        return json({ error }, { status: 500 })
    }

    return json(data, { status: 202, statusText: "Unidade atualizada com sucesso" })
}

export const DELETE: RequestHandler = async ({ locals: { supabase, getSession }, url }) => {
    const id = url.searchParams.get("id")

    if (!id) return json({ error: "ID não informado" }, { status: 400 })

    const session = await getSession()
    if (!session) return json(null, { status: 401 })

    const { data, error: err } = await supabase
        .from("units")
        .delete()
        .eq("id", id)
        .eq("user", session.user.id)
        .select()
        .single()

    if (err) {
        console.log(err)
        return json({ err }, { status: 500 })
    }

    return json(data, { status: 200, statusText: "Unidade removida com sucesso" })
}
