import type { RequestHandler } from "@sveltejs/kit"

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
        .select()
        .single()

    if (error) {
        console.log(error)
        return new Response(JSON.stringify({ error }), { status: 500 })
    }

    return new Response(JSON.stringify(data), {
        status: 202,
        statusText: "Marca adicionada com sucesso",
    })
}
