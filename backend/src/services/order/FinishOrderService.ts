import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class FinishOrderService {
  async execute({ order_id }: OrderRequest) {
    if (!order_id) {
      throw new Error("ID do pedido é necessário.");
    }

    try {
      // Verificação da existência do pedido
      const existingOrder = await prismaClient.order.findUnique({
        where: { id: order_id },
      });

      if (!existingOrder) {
        throw new Error("Pedido não encontrado.");
      }

      // Verificação se o pedido já está finalizado
      if (existingOrder.status === true) {
        throw new Error("Pedido já está finalizado.");
      }

      // Atualização do status do pedido para finalizado
      const order = await prismaClient.order.update({
        where: {
          id: order_id,
        },
        data: {
          status: true,
        },
      });

      return order;
    } catch (error) {
      console.error("Erro ao finalizar o pedido:", error);
      throw new Error("Não foi possível finalizar o pedido.");
    }
  }
}

export { FinishOrderService };
