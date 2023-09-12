import { AuthApiError } from "@supabase/supabase-js"
import { redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

export const actions: Actions = {
    "email-password": async ({ request, locals: { supabase, getSession } }) => {
        const loginData = Object.fromEntries(await request.formData()) || {}

        const { data, error: err } = await supabase.auth.signInWithPassword(
            loginData as { email: string; password: string },
        )
        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                return { status: 400, body: "Email ou password inválidos." }
            } else {
                return { status: 500, body: "Erro desconhecido." }
            }
        }

        const session = await getSession()

        if (session) {
            const { data: userData, error: userErr } = await supabase
                .from("profiles")
                .select()
                .eq("id", data.user.id)
                .single()

            if (userErr) {
                console.log(userErr)
                return { status: 500, body: "Erro desconhecido." }
            }
        }

        throw redirect(301, "/dashboard")
    },
    google: async ({ locals: { supabase } }) => {
        // const { data, error } = await supabase.auth.signInWithIdToken({
        //     token: response.credential,
        //     nonce: "NONCE", // must be the same one as provided in data-nonce (if any)
        // })
        // if (err) {
        //     console.log(err)
        //     return { status: 500, body: "Erro desconhecido." }
        // }
        // console.log("Login successful")
        // console.log(data)
        // throw redirect(301, "/dashboard")
    },
}
