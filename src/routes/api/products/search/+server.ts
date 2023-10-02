import { json, type RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async ({ locals: { supabase, getSession }, url }) => {
    const session = await getSession()
    if (!session) {
        return json({}, { status: 401, statusText: "Unauthorized" })
    }

    const search = url.searchParams.get("for")
    const { data, error: err } = await supabase
        .from("products")
        .select()
        .ilike("name", `%${search}%`)
        .eq("user", session.user.id)
    if (err) {
        console.error(err.message)
        return json({}, { status: 500, statusText: "Internal Server Error" })
    }
    return json(data, { status: 200, statusText: "OK" })
}
