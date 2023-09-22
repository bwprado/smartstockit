import type { RequestHandler } from "@sveltejs/kit"
import { isNil, omitBy } from "lodash"

export const POST: RequestHandler = async ({ locals: { supabase, getSession }, request }) => {
    const session = await getSession()

    if (!session) {
        console.log("Unauthorized session, please login.")
        return new Response(JSON.stringify({ error: "Unauthorized session, please login." }), {
            status: 401,
        })
    }

    const body = JSON.parse(await request.text())

    const product = omitBy(
        {
            name: body.name,
            unit: body.unit.id,
            brand: body.brand?.value || null,
            category: body.category?.value || null,
            supplier: body.supplier?.value || null,
            type: body.type?.value || "raw",
            min: +body.min,
            max: +body.max,
            balance: 0,
            barcode: body.barcode,
            user: session.user.id,
        },
        isNil,
    )

    const { data, error } = await supabase.from("products").insert(product).select()

    if (error) {
        console.log(error)
        return new Response(JSON.stringify({ error }), { status: 500 })
    }

    return new Response(JSON.stringify(data), {
        status: 202,
        statusText: "Produto adicionado com sucesso",
    })
}