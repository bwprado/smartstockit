import { json, type RequestHandler } from "@sveltejs/kit"
import _ from "lodash"
import type { Product } from "../../../../types/supabase"

export const POST: RequestHandler = async ({ locals: { supabase, getSession }, request }) => {
    const session = await getSession()

    if (!session) {
        return json(
            { error: "Sessão não autorizada, por favor faça o login." },
            {
                status: 401,
            },
        )
    }

    const body = await request.json()

    const product = _.omitBy(
        {
            name: body.name,
            unit: body.unit?.id || null,
            brand: body.brand?.value || null,
            category: body.category?.value || null,
            supplier: body.supplier?.value || null,
            type: body.type || "raw",
            min: +body.min,
            max: +body.max,
            balance: +body?.balance || 0,
            price: +body.price,
            cost: +body.cost,
            barcode: body.barcode,
            user: session.user.id,
            composition: body?.composition || [],
        },
        _.isNil,
    )

    const { data, error: err } = await supabase.from("products").insert(product).select().single()

    const { unit, ...returndProduct } = (data as Product) || {}

    if (err) {
        console.log(err)
        return json({ error: err }, { status: 500 })
    }

    return json(
        { product: { ...returndProduct, units: unit } },
        {
            status: 202,
            statusText: "Produto adicionado com sucesso",
        },
    )
}
