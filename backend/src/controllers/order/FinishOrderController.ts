import { Request, Response } from 'express';
import { FinishOrderService } from '../../services/order/FinishOrderService';

class FinishOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.body;

    // Validação de entrada
    if (!order_id) {
      return res.status(400).json({ error: "ID do pedido é necessário." });
    }

    const finishOrderService = new FinishOrderService();

    try {
      const order = await finishOrderService.execute({ order_id });
      return res.json(order);
    } catch (error) {
      console.error("Erro ao finalizar o pedido:", error);

      // Personalização do código de status baseado no tipo de erro
      if (error.message.includes("Pedido não encontrado") || error.message.includes("Pedido já está finalizado")) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

export { FinishOrderController };
