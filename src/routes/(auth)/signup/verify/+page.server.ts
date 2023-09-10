import { error, type Actions, type Load, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: Load = async ({ url }) => {
    const email = url.searchParams.get("email") as string
    return {
        email,
    }
}

export const actions: Actions = {
    verify: async ({ request, locals: { supabase }, url }) => {
        const formData = await request.formData()
        const token = formData.get("token") as string
        const email = url.searchParams.get("email") as string
        const { data, error: err } = await supabase.auth.verifyOtp({ email, token, type: "email" })

        if (err) {
            error(400, err.message)
        }

        console.log(data)
        throw redirect(303, "/")
    },
}
