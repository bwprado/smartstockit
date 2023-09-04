import { AuthApiError } from "@supabase/supabase-js"
import { redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const loginData = Object.fromEntries(await request.formData()) || {}

        const { error: err } = await supabase.auth.signInWithPassword(loginData as { email: string, password: string })
        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                return { status: 400, body: "Email ou password inválidos." }
            } else {
                return { status: 500, body: "Erro desconhecido." }
            }
        }
        console.log("Login successful")
        throw redirect(301, "/dashboard")
    }
}
