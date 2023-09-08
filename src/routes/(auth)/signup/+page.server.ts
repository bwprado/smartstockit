import { redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

export const actions: Actions = {
    signup: async ({ request, locals: { supabase } }) => {
        const data = await request.formData()
        const email = data.get("email") as string

        const { error } = await supabase.auth.signInWithOtp({ email })

        if (error) {
            return {
                status: 400,
                body: error.message,
            }
        }
        throw redirect(303, "signup/verify")
    },
}
