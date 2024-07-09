import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class SendOrderService {
    async execute({ order_id }: OrderRequest) {
        if (!order_id) {
            throw new Error("ID do pedido é necessário.");
        }

        try {
            // Verifica se o pedido existe
            const order = await prismaClient.order.findUnique({
                where: { id: order_id },
            });

            if (!order) {
                throw new Error("Pedido não encontrado.");
            }

            // Atualiza o status do pedido
            const updatedOrder = await prismaClient.order.update({
                where: { id: order_id },
                data: { draft: false }
            });

            return updatedOrder;

        } catch (error) {
            console.error("Erro ao enviar o pedido:", error);
            if (error.code === 'P2025') {
                throw new Error("Pedido não encontrado.");
            }
            throw new Error("Não foi possível atualizar o status do pedido.");
        }
    }
}

export { SendOrderService };

