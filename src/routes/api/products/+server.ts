import { json, type RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()
    if (!session) return json(null, { status: 401 })

    const { data, error: err } = await supabase
        .from("products")
        .select()
        .eq("user", session.user.id)

    if (err) return json(err, { status: 500 })
    return json(data, { status: 200 })
}
