import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { table, name } = req.body;

    const createOrderService = new CreateOrderService();

    // Validação de entrada
    if (typeof table !== "number" || isNaN(table) || table <= 0) {
      return res
        .status(400)
        .json({
          error: "Número da mesa inválido. Deve ser um número positivo.",
        });
    }

    try {
      const order = await createOrderService.execute({ table, name });
      return res.json(order);
    } catch (error) {
      console.error("Erro ao criar o pedido:", error);
      // Personalização do código de status baseado no tipo de erro
      if (error instanceof Error) {
        if (
          error.message.includes("Número da mesa inválido") ||
          error.message.includes("Nome inválido")
        ) {
          return res.status(400).json({ error: error.message });
        }
      }
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

export { CreateOrderController };
