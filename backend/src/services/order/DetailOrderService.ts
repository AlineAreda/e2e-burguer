import prismaClient from "../../prisma";

interface DetailRequest {
    order_id: string;
}

class DetailOrderService {
    async execute({ order_id }: DetailRequest) {
        if (!order_id) {
            throw new Error("ID do pedido é necessário.");
        }

        try {
            const orderExists = await prismaClient.order.findUnique({
                where: { id: order_id },
            });

            if (!orderExists) {
                throw new Error("Pedido não encontrado.");
            }

            const orderDetails = await prismaClient.item.findMany({
                where: { order_id: order_id },
                include: {
                    product: true,
                    order: true,
                },
            });

            return orderDetails;
        } catch (error) {
            console.error("Erro ao obter detalhes do pedido:", error);
            throw new Error("Não foi possível obter os detalhes do pedido.");
        }
    }
}

export { DetailOrderService };
