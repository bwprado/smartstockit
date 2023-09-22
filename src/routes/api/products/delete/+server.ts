import type { RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ locals: { supabase }, url }) => {
    const id = url.searchParams.get("id")
    let products
    if (id) {
        const { data, error } = await supabase.from("products").delete().eq("id", id).select()
        products = data
        
        if (error) {
            return new Response(JSON.stringify({ error }), { status: 500 })
        }
    }

    return new Response(JSON.stringify({ success: products ? products[0] : [] }), {
        status: 202,
        statusText: "Produto deletado com sucesso",
    })
}
