import { Request, Response } from 'express'
import { AddItemService } from '../../services/order/AddItemService'

class AddItemController {
    async handle(req: Request, res: Response) {
        const { order_id, product_id, amount } = req.body;

        // Validação de entrada
        if (!order_id || !product_id || amount === undefined) {
            return res.status(400).json({ error: "Todos os campos são necessários." });
        }

        if (amount <= 0) {
            return res.status(400).json({ error: "A quantidade deve ser um número positivo." });
        }

        const addItemService = new AddItemService();

        try {
            const order = await addItemService.execute({
                order_id,
                product_id,
                amount
            });

            return res.json(order);
        } catch (error) {
            console.error("Erro ao adicionar item ao pedido:", error);

            // Personalização do código de status baseado no tipo de erro
            if (error.message.includes("Pedido não encontrado") || error.message.includes("Produto não encontrado")) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
}

export { AddItemController };
