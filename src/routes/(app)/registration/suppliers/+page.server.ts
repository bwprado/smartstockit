import type { PageServerLoad } from "../../../$types"

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()
    const { data: suppliers, error: err } = await supabase
        .from("suppliers")
        .select("*")
        .eq("user", session?.user.id)

    if (err) {
        throw err
    }

    return {
        suppliers,
    }
}
