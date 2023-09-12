import { Session, SupabaseClient, User } from "@supabase/supabase-js"
import type { IProfile } from "./hooks.server"
import type { Profile } from "./types/supabase"

declare global {
    namespace App {
        interface Locals {
            supabase: SupabaseClient
            getSession(): Promise<Session | null>
            getProfile(): Promise<IProfile>
            signIn(email: string, password: string): Promise<{ user: User; session: Session }>
            signOut(): void
        }
        interface PageData {
            session: Promise<Session | null>
            profile: Promise<Profile>
        }

        interface LayoutData {
            session: Promise<Session | null>
            profile: Promise<Profile>
        }

        interface LayoutServerLoad {
            session: Promise<Session | null>
            profile: Promise<Profile | null>
        }

        interface PageServerLoad {
            email?: string
            supabase?: Promise<SupabaseClient>
        }
    }
}
