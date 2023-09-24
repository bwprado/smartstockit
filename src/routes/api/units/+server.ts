import { json, type RequestHandler } from "@sveltejs/kit"

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
