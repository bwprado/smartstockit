import type { RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ locals: { supabase }, url }) => {
    const id = url.searchParams.get("id")
    if (id) {
        const { data, error } = await supabase.auth.admin.deleteUser(id)

        const { data: profile, error: err } = await supabase.from("profiles").delete().match({ id })

        if (error || err) {
            return new Response(JSON.stringify({ error: error || err?.code }), { status: 500 })
        }
    }

    return new Response(null, {
        status: 202,
        statusText: "Usuário deletado com sucesso",
    })
}
