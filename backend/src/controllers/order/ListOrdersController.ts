import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrdersService";

class ListOrdersController {
  async handle(req: Request, res: Response) {
    const listOrdersService = new ListOrdersService();

    try {
      const orders = await listOrdersService.execute();

      if (orders.length === 0) {
        return res.json({ message: "Nenhum pedido encontrado." });
      }

      return res.json(orders);
    } catch (error) {
      console.error("Erro ao listar os pedidos:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

export { ListOrdersController };


