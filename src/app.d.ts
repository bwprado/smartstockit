import { SupabaseClient, Session, User } from '@supabase/supabase-js'

declare global {
    namespace App {
        interface Locals {
            supabase: SupabaseClient
            getSession(): Promise<Session | null>
            signIn(email: string, password: string): Promise<{ user: User, session: Session }>
            signOut(): void
        }
        interface PageData {
            session: Session | null
        }

        interface LayoutData {
            session: Session | null
        }
    }
}