import { redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

export const actions: Actions = {
    email: async ({ request, locals: { supabase } }) => {
        const data = await request.formData()
        const email = data.get("email") as string
        const password = data.get("password") as string

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `https://smartstockit.com` },
        })

        if (error) {
            return {
                status: 400,
                body: error.message,
            }
        }
        throw redirect(303, `signup/verify?email=${email}`)
    },
    google: async ({ locals: { supabase } }) => {
        const { data, error: err } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `https://smartstockit.com/auth/callback/`,
            },
        })

        if (err) {
            return {
                status: 400,
                body: err.message,
            }
        }
        throw redirect(303, data.url as string)
    },
}
