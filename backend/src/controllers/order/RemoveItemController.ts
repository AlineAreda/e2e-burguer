import { Request, Response } from "express";
import { RemoveItemService } from "../../services/order/RemoveItemService";

class RemoveItemController {
  async handle(req: Request, res: Response) {
    const item_id = req.query.item_id as string;

    // Verificação de entrada
    if (!item_id) {
      return res.status(400).json({ error: "ID do item é necessário." });
    }

    const removeItemService = new RemoveItemService();

    try {
      const order= await removeItemService.execute({ item_id });
      return res.json({ message: "Item removido com sucesso", order });
    } catch (error) {
      console.error("Erro ao remover o item:", error);

      // O código de status com base no tipo de erro
      if (error.message === "Item não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

export { RemoveItemController };
