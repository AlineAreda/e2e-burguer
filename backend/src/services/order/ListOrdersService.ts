import prismaClient from "../../prisma";

class ListOrdersService {
  async execute() {
    try {
      const orders = await prismaClient.order.findMany({
        where: {
          draft: false,
          status: false,
        },
        orderBy: {
          created_at: 'desc',
        },
      });

      return orders;
    } catch (error) {
      console.error("Erro ao listar os pedidos:", error);
      throw new Error("Não foi possível listar os pedidos.");
    }
  }
}

export { ListOrdersService };

