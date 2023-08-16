import { AuthApiError } from "@supabase/supabase-js"
import { redirect, type Actions, error } from "@sveltejs/kit"

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const loginData = Object.fromEntries(await request.formData()) || {}

        const { error: err } = await supabase.auth.signInWithPassword(loginData as { email: string, password: string })

        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                return error(401, err.message)
            } else {
                return error(500, err.message)
            }
        }
        throw redirect(301, "/")
    }
}
