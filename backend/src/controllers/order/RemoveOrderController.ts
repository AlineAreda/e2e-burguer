import { Request, Response } from 'express';
import { RemoveOrderService } from '../../services/order/RemoveOrderService';

class RemoveOrderController {
    async handle(req: Request, res: Response) {
        const order_id = req.params.order_id as string;

        const removeOrder = new RemoveOrderService();
        
        // Validação de entrada
        if (!order_id) {
          return res.status(400).json({ error: "ID do pedido é necessário." });
      }
        try {
            const order = removeOrder.execute({ order_id });
            return res.json({ message: "Pedido removido com sucesso", order });
        } catch (error) {
            console.error("Erro ao remover o pedido:", error);
            
            // código de status baseado no tipo de erro
            if (error.message === 'Pedido não encontrado') {
                return res.status(404).json({ error: error.message });
            }
            if (error.message === 'ID do pedido inválido') {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
}

export { RemoveOrderController };

