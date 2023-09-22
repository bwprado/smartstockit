import type { RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ locals: { supabase, getSession }, request }) => {
    const session = await getSession()
    if (!session) {
        console.log("No session, please login to continue.")
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
    }

    const body = JSON.parse(await request.text())
    console.log(body)

    // const { data, error } = await supabase.from("brands").insert({}).select()
    return new Response(body, { status: 202, statusText: "Marca adicionada com sucesso" })
}
