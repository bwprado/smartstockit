import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
    if (!await getSession()) {
        throw redirect(303, '/login')
    }
    const fetchUsers = async () => {
        const { data: users, error: err } = await supabase.from('profiles').select('*')

        if (err) {
            console.log(err)
            throw error(500, err.message)
        }
        return users
    }

    return {
        users: fetchUsers()
    }
};