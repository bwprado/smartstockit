import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createSupabaseServerClient({
        supabaseUrl: PUBLIC_SUPABASE_URL as string,
        supabaseKey: PUBLIC_SUPABASE_KEY as string,
        event,
    })

    event.locals.getSession = async () => {
        const { data: { session } } = await event.locals.supabase.auth.getSession()
        return session
    }

    event.locals.signIn = async (email: string, password: string) => {
        const { data, error } = await event.locals.supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) throw new Error(error.message)
        return data
    }

    event.locals.signOut = async () => {
        const { error } = await event.locals.supabase.auth.signOut()
        if (error) throw new Error(error.message)
    }

    const response = await resolve(event)
    return response
}
