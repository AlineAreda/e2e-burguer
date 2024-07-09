import prismaClient from "../../prisma";

class DetailUserService {
    async execute(user_id: string) {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    id: user_id
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    created_at: true,
                    updated_at: true,
                }
            });

            if (!user) {
                throw new Error('Usuário não encontrado.');
            }

            return user;
        } catch (error) {
            console.error("Erro ao buscar os detalhes do usuário: ", error);
            throw error;
        }
    }
}

export { DetailUserService };
