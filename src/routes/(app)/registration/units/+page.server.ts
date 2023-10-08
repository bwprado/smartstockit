import type { PageServerLoad } from "../../../$types"

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()
    const { data: units, error: err } = await supabase
        .from("units")
        .select("*")
        .eq("user", session?.user.id)

    if (err) {
        throw err
    }

    return {
        units,
    }
}
