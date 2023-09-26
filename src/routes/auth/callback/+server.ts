import { error, redirect, type RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
    const code = url.searchParams.get("code")

    if (code) {
        const { data, error: err } = await supabase.auth.exchangeCodeForSession(code)

        if (err) {
            console.error(err)
            throw error(401, "/login")
        }

        throw redirect(303, "/dashboard")
    }

    throw redirect(304, "/login")
}
