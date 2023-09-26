import { AuthApiError, type Provider } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

export const actions: Actions = {
    default: async ({ request, locals: { supabase, getSession }, url }) => {
        const provider = url.searchParams.get("provider") as Provider

        if (provider === "google") {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: "https://smartstockit.com/auth/callback/",
                },
            })

            if (error instanceof AuthApiError) {
                console.log(error)
                return fail(error.status, { message: error.message })
            }
            throw redirect(301, data?.url as string)
        }

        const loginData = Object.fromEntries(await request.formData()) || {}

        const { data, error: err } = await supabase.auth.signInWithPassword(
            loginData as { email: string; password: string },
        )

        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                return fail(400, { message: "Email ou password inválidos." })
            } else {
                return fail(500, { message: "Erro desconhecido." })
            }
        }

        const session = await getSession()

        if (session) {
            const { data: _, error: userErr } = await supabase
                .from("profiles")
                .select()
                .eq("id", data.user.id)
                .single()

            if (userErr) {
                console.log(userErr)
                return fail(500, { message: "Erro desconhecido." })
            }
        }

        throw redirect(301, "/dashboard")
    },
}
