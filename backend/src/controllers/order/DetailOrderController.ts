import { Request, Response } from "express";
import { DetailOrderService } from "../../services/order/DetailOrderService";

class DetailOrderController {
  async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string;

    const detailOrderService = new DetailOrderService();

    // Validação de entrada
    if (!order_id) {
      return res.status(400).json({ error: "ID do pedido é necessário." });
    }

    try {
      const orders = await detailOrderService.execute({ order_id });

      // Verificação se o pedido existe e possui itens
      if (!orders || orders.length === 0) {
        return res.status(404).json({ error: "Pedido não encontrado ou sem itens." });
      }

      return res.json(orders);
    } catch (error) {
      console.error("Erro ao obter detalhes do pedido:", error);

      // Personalização do código de status baseado no tipo de erro
      if (error.message.includes("Pedido não encontrado")) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

export { DetailOrderController };


