import { error, redirect, type Actions, type Load } from "@sveltejs/kit"

export const load: Load = async ({ url }) => {
    const email = url.searchParams.get("email") as string
    return {
        email,
    }
}

export const actions: Actions = {
    verify: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const password = formData.get("password") as string
        const email = formData.get("email") as string
        const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })

        if (err) {
            throw error(400, err.message)
        }

        throw redirect(303, "/")
    },
}
