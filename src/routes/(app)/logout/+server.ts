import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals: { supabase } }) => {
    const { error: err } = await supabase.auth.signOut();

    if (err) {
        console.error(err);
        return error(500, 'Failed to sign out');
    }
    throw redirect(303, '/login')
};