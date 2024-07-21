import prismaClient from "../../prisma";

interface CategoryRequest {
    category_id: string;
}

class RemoveCategoryService {
    async execute({ category_id }: CategoryRequest) {
        try {
            const removedCategory = await prismaClient.category.delete({
                where: {
                    id: category_id,
                },
            });

            //return removedCategory;
            return { message: "Categoria removida com sucesso." };
        } catch (error) {
            if (error.code === 'P2025') { // Código de erro específico do Prisma para "registro não encontrado"
                throw new Error(`Categoria com o ID ${category_id} não encontrada`);
            } else {
                throw new Error(`Erro ao remover categoria: ${error.message}`);
            }
        }
    }
}

export { RemoveCategoryService };
