import { error, json, type RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ locals: { supabase, getSession }, request }) => {
    const session = await getSession()
    if (!session) {
        return json(401, { statusText: "Não autorizado", status: 401 })
    }
    const outputData: { label: string; id: string; amount: number }[] = await request.json()
    const negativeAmountData = outputData.map(({ amount, id }) => ({
        product: id,
        amount: amount * -1,
        user: session?.user?.id,
        price: 0,
    }))
    const { data, error: err } = await supabase
        .from("inventory")
        .insert(negativeAmountData)
        .eq("user", session?.user?.id)
        .select()

    if (err) {
        console.log(err)
        throw error(500, { message: `Erro ao inserir saída no estoque - ${err?.message}` })
    }
    console.log(data)
    return json(data, { status: 201, statusText: "Saída registrada com sucesso." })
}

export const DELETE: RequestHandler = async ({ locals: { supabase, getSession }, request }) => {
    const session = await getSession()
    if (!session) {
        return json(401, { statusText: "Não autorizado", status: 401 })
    }

    const outputData = await request.json()

    const { data, error: err } = await supabase
        .from("inventory")
        .delete()
        .eq("id", outputData.id)
        .eq("user", session?.user?.id)
        .single()

    if (err) {
        console.log(err)
        throw error(500, { message: `Erro ao deletar saída no estoque - ${err?.message}` })
    }

    return json(data, { status: 201, statusText: "Saída deletada com sucesso." })
}
