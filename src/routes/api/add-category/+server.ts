import { json, type RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ request, locals: { supabase, getSession } }) => {
    const { name, ref } = (await request.json()) || {}
    const session = await getSession()
    const user = session?.user

    const { data, error } = await supabase
        .from("categories")
        .insert({ name, user: user?.id, ref })
        .select()
        .single()

    if (error) {
        return new Response(JSON.stringify({ error }), { status: 500 })
    }

    return json({ data }, { status: 202, statusText: "Categoria adicionada com sucesso" })
}
