import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class RemoveOrderService {
  async execute({ order_id }: OrderRequest) {
    if (typeof order_id !== "string" || order_id.trim() === "") {
      throw new Error("ID do pedido inválido");
    }

    try {
      const order = await prismaClient.order.delete({
        where: { id: order_id },
      });
      return order;
    } catch (error) {
      throw new Error(error.message);

      if (error.code === "P2025") {
        // Erro específico do Prisma para "Registro não encontrado"
        throw new Error("Pedido não encontrado");
      }
      throw new Error("Erro ao remover o pedido");
    }
  }
}

export { RemoveOrderService };

