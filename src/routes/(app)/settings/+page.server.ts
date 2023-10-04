import { redirect, type Actions } from "@sveltejs/kit"
import type { Profile } from "../../../types/supabase"
import type { PageServerLoad } from "./$types"

interface User {
    email: string
    password: string
}

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
    const session = await getSession()
    if (!session) {
        throw redirect(303, "/login")
    }
    const fetchUserProfile = async () => {
        const { data: user, error: err } = await supabase
            .from("profiles")
            .select("*")
            .eq("user", session.user.id)
            .single()

        if (err) {
            console.log(err)
            return {} as Partial<Profile>
        }
        return user as Profile
    }

    return {
        user: await fetchUserProfile(),
    }
}

export const actions: Actions = {
    addUser: async ({ request, locals: { supabase } }) => {
        const formData = Object.fromEntries(await request.formData()) as unknown as User &
            Partial<Profile>

        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: "123456",
        })

        const { data: profile, error: err } = await supabase.from("profiles").insert([
            {
                name: formData.name,
                email: formData.email,
                role: formData.role,
            },
        ])

        if (error || err) {
            console.log(error || err)

            return {
                status: 500,
                body: "Alguma coisa deu errado na criação do usuário",
            }
        }

        return { status: 200, body: "Usuário criado com sucesso" }
    },
    edit: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            return {
                status: 401,
                body: "Você não está logado",
            }
        }
        const formData = Object.fromEntries(await request.formData()) as unknown as User &
            Partial<Profile>

        const { data, error } = await supabase
            .from("profiles")
            .update({ ...formData, user: session.user.id })
            .eq("user", session.user.id)
            .eq("id", formData.id)
            .select()
            .single()

        if (error) {
            console.log(error)

            return {
                status: 500,
                body: "Alguma coisa deu errado na edição do usuário",
            }
        }

        return { status: 200, body: "Usuário editado com sucesso", data }
    },
}
