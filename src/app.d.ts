import { SupabaseClient, Session, User } from '@supabase/supabase-js'
import type { IProfile } from './hooks.server'

declare global {
    namespace App {
        interface Locals {
            supabase: SupabaseClient
            getSession(): Promise<Session | null>
            getUserProfile(): Promise<IProfile>
            signIn(email: string, password: string): Promise<{ user: User, session: Session }>
            signOut(): void
        }
        interface PageData {
            session: Promise<Session | null>
            user: Promise<IProfile>
        }

        interface LayoutData {
            session: Promise<Session | null>
            user: Promise<IProfile>
        }

        interface LayoutServerLoad {
            session: Promise<Session | null>
            user: Promise<IProfile>
        }
    }
}