import { SupabaseClient, Session, User } from '@supabase/supabase-js'

declare global {
    namespace App {
        interface Locals {
            supabase: SupabaseClient
            getSession(): Promise<Session | null>
            getUserProfile(): Promise<{ id: string, name: string, email: string, role: "user" | "admin" }>
            signIn(email: string, password: string): Promise<{ user: User, session: Session }>
            signOut(): void
        }
        interface PageData {
            session: Promise<Session | null>
            user: Promise<{ id: string, name: string, email: string, role: "user" | "admin" }>
        }

        interface LayoutData {
            session: Promise<Session | null>
            user: Promise<{ id: string, name: string, email: string, role: "user" | "admin" }>
        }

        interface LayoutServerLoad {
            session: Promise<Session | null>
            user: Promise<{ id: string, name: string, email: string, role: "user" | "admin" }>
        }
    }
}