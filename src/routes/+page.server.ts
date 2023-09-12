import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals: { getSession, getProfile } }) => {
    return {
        session: await getSession(),
        profile: await getProfile(),
    }
}
