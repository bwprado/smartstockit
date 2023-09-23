import { Session, SupabaseClient, User } from "@supabase/supabase-js"
import { Database } from "./DatabaseDefinitions"
import type { Profile } from "./types/supabase"

declare global {
    namespace App {
        interface Locals {
            supabase: SupabaseClient<Database>
            getSession(): Promise<Session | null>
            getProfile(): Promise<Profile>
            signIn(email: string, password: string): Promise<{ user: User; session: Session }>
            signOut(): void
        }
        interface PageData {
            session?: Promise<Session | null>
            profile?: Promise<Profile>
        }

        interface LayoutData {
            session?: Promise<Session | null>
            profile?: Promise<Profile>
        }

        interface LayoutServerLoad {
            session?: Promise<Session | null>
            profile?: Promise<Profile | null>
        }

        interface PageServerLoad {
            email?: string
            supabase?: Promise<SupabaseClient>
            profile?: Promise<Profile | null>
            session?: Promise<Session | null>
        }
    }
}
