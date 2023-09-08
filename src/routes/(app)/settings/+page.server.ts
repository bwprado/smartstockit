import { error, redirect, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import type { IProfile } from "../../hooks.server"

interface User {
    email: string
    password: string
}

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
    if (!(await getSession())) {
        throw redirect(303, "/login")
    }
    const fetchUsers = async () => {
        const { data: users, error: err } = await supabase.from("profiles").select("*")

        if (err) {
            console.log(err)
            throw error(500, err.message)
        }
        return users as IProfile[]
    }

    return {
        users: fetchUsers(),
    }
}

export const actions: Actions = {
    addUser: async ({ request, locals: { supabase } }) => {
        const formData = Object.fromEntries(await request.formData()) as unknown as User &
            Partial<IProfile>

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
}
