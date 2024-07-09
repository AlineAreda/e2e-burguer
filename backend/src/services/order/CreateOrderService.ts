import prismaClient from "../../prisma";

interface OrderRequest {
    table: number;
    name?: string;
}

class CreateOrderService {
    async execute({ table, name }: OrderRequest) {
        // Validação do número da mesa
        if (typeof table !== 'number' || isNaN(table) || table <= 0) {
            throw new Error('Número da mesa inválido');
        }

        // Validação do nome (opcional)
        if (name && typeof name !== 'string') {
            throw new Error('Nome inválido');
        }

        try {
            // Crie o pedido
            const order = await prismaClient.order.create({
                data: {
                    table: table,
                    name: name || null, // Use null se o nome não for fornecido
                },
            });

            return order;
        } catch (error) {
            // Tratamento de erros
            console.error("Erro ao criar o pedido:", error);
            throw new Error('Erro ao criar o pedido');
        }
    }
}

export { CreateOrderService };
