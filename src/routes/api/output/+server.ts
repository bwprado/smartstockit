import { error, json, type RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ locals: { supabase, getSession }, request }) => {
    const session = await getSession()
    if (!session) {
        return json(401, { statusText: "Não autorizado", status: 401 })
    }

    const outputData = await request.json()

    const negativeAmount = -Number(outputData.amount)
    const { data, error: err } = await supabase
        .from("inventory")
        .insert([{ ...outputData, amount: negativeAmount, user: session?.user?.id, price: 0 }])
        .eq("user", session?.user?.id)
        .select()
        .single()

    if (err) {
        console.log(err)
        throw error(500, { message: `Erro ao inserir saída no estoque - ${err?.message}` })
    }

    return json(data, { status: 201, statusText: "Saída registrada com sucesso." })
}
