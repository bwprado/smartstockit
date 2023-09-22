import { error, type RequestHandler } from "@sveltejs/kit"

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

    return new Response()
}
