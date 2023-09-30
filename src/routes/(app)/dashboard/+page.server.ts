import { fail, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
    const fetchInventory = async () => {
        const session = await getSession()

        if (!session) {
            throw redirect(303, "/login")
        }

        const { data: input, error: errInput } = await supabase
            .from("inventory")
            .select("*, products!inner(name, price)")
            .gte("amount", 1)
            .eq("user", session.user.id)

        const { data: output, error: errOutput } = await supabase
            .from("inventory")
            .select("*, products!inner(name, price)")
            .lte("amount", -1)
            .eq("user", session.user.id)

        if (errInput || errOutput) {
            console.log(errInput, errOutput)
            throw fail(500, { message: "Alguma coisa deu errado!" })
        }
        return {
            input,
            output,
        }
    }

    return {
        inventory: await fetchInventory(),
    }
}
