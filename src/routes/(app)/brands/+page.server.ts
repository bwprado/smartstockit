import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()

    if (!session) {
        throw error(401, { message: "Usuário não autenticado" })
    }

    const { data: brands, error: err } = await supabase
        .from("brands")
        .select("*")
        .eq("user", session.user.id)

    if (err) {
        throw error(500, { message: "Erro ao carregar as marcas" })
    }

    return {
        brands,
    }
}
