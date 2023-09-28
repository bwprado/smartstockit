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
