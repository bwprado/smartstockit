import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public"
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit"
import { error, fail, type Handle } from "@sveltejs/kit"

const unprotectedRoutes = ["/", "/login", "/signup", "/signup/verify", "/logout"]

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createSupabaseServerClient({
        supabaseUrl: PUBLIC_SUPABASE_URL as string,
        supabaseKey: PUBLIC_SUPABASE_KEY as string,
        event,
    })

    event.locals.getSession = async () => {
        const {
            data: { session },
            error: err,
        } = await event.locals.supabase.auth.getSession()
        if (err) {
            fail(401, { message: "Unauthorized" })
        }
        return session
    }

    event.locals.signIn = async (email: string, password: string) => {
        const { data, error } = await event.locals.supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) {
            console.error(error)
            throw new Error(error.message)
        }
        return data
    }

    event.locals.getProfile = async () => {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()

        if (!session) return null

        const { data, error: err } = await event.locals.supabase
            .from("profiles")
            .select()
            .eq("id", session.user.id)
            .single()

        if (err) {
            console.error(err)
            throw error(500, err.message)
        }

        return data
    }

    event.locals.signOut = async () => {
        const { error } = await event.locals.supabase.auth.signOut()
        if (error) throw new Error(error.message)
    }

    if (!unprotectedRoutes.includes(event.url.pathname)) {
        if (!(await event.locals.getSession())) {
            throw error(401, {
                message: "Unauthorized",
            })
        }
    }

    const response = await resolve(event)
    return response
}
