import { fail, type Actions } from "@sveltejs/kit"
import type { Customer } from "../../../types/supabase"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
    const fetchCustomers = async () => {
        const session = await getSession()

        if (!session) {
            return []
        }

        const { data, error } = await supabase
            .from("customers")
            .select()
            .eq("user", session.user.id)

        if (error) {
            console.log(error)
            return []
        }

        return (data as Customer[]) || []
    }

    return {
        customers: await fetchCustomers(),
    }
}

export const actions: Actions = {
    add: async ({ locals: { supabase, getSession }, request }) => {
        const session = await getSession()
        if (!session) {
            return fail(401, { message: "Usuário não autenticado", noSession: true })
        }

        const body = await request.formData()

        const name = body.get("name")
        const email = body.get("email")
        const phone = body.get("phone")
        const address = body.get("address")

        if (!name) {
            return fail(400, { message: "Nome é obrigatório", nameMissing: true })
        }

        await supabase.from("customers").insert({
            name,
            email,
            phone,
            address,
            user: session.user.id,
        })

        return {
            success: true,
        }
    },
    edit: async ({ locals: { supabase, getSession }, request }) => {
        const session = await getSession()
        if (!session) {
            return fail(401, { message: "Usuário não autenticado", noSession: true })
        }

        const body = await request.formData()

        const name = body.get("name")
        const email = body.get("email")
        const phone = body.get("phone")
        const address = body.get("address")
        const id = body.get("id")

        if (!name) {
            return fail(400, { message: "Nome é obrigatório", nameMissing: true })
        }

        await supabase
            .from("customers")
            .update({
                name,
                email,
                phone,
                address,
            })
            .eq("id", id)

        return {
            success: true,
        }
    }
}
