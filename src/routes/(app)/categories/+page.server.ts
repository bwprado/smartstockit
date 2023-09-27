import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()
    const { data: categories, error: err } = await supabase
        .from("categories")
        .select("*")
        .eq("user", session?.user?.id)

    if (err) {
        throw error(+err.code, err.message)
    }

    return {
        categories,
    }
}
