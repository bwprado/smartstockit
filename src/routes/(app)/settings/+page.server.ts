import { error, redirect, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import type { Profile, Unit } from "../../../types/supabase"

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
            throw error(500, err.message)
        }
        return user as Profile
    }

    const fetchUnits = async () => {
        const { data: units, error: err } = await supabase
            .from("units")
            .select("*")
            .eq("user", session.user.id)

        if (err) {
            console.log(err)
            throw error(500, err.message)
        }

        return units as Unit[]
    }

    return {
        user: fetchUserProfile(),
        units: fetchUnits(),
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
    addUnit: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData()
        const name = formData.get("unit") as string
        const acronym = formData.get("acronym") as string

        const session = await getSession()
        if (!session) {
            throw redirect(303, "/login")
        }

        const { data, error: err } = await supabase
            .from("units")
            .insert({ name, acronym, user: session.user.id })
            .select("*")
            .single()

        if (err) {
            console.log(err)
            return {
                status: 500,
                body: "Alguma coisa deu errado na criação da unidade",
            }
        }

        return { status: 200, body: data }
    },
}
