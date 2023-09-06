import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
    if (!await getSession()) {
        throw redirect(303, '/login')
    }
};