import prismaClient from "../../prisma";

interface ItemRequest {
    order_id: string;
    product_id: string;
    amount: number;
}

class AddItemService {
    async execute({ order_id, product_id, amount }: ItemRequest) {
        try {
            // Verificação da validade do amount
            if (amount <= 0) {
                throw new Error("A quantidade deve ser um número positivo.");
            }

            // Verificação da existência do pedido
            const orderExists = await prismaClient.order.findUnique({
                where: { id: order_id },
            });
            if (!orderExists) {
                throw new Error("Pedido não encontrado.");
            }

            // Verificação da existência do produto
            const productExists = await prismaClient.product.findUnique({
                where: { id: product_id },
            });
            if (!productExists) {
                throw new Error("Produto não encontrado.");
            }

            // Criação do item na ordem
            const order = await prismaClient.item.create({
                data: {
                    order_id: order_id,
                    product_id: product_id,
                    amount: amount,
                },
            });

            return order;
        } catch (error) {
            console.error("Erro ao adicionar item ao pedido:", error);
            throw new Error(error.message); // Repassar o erro com a mensagem original
        }
    }
}

export { AddItemService };

