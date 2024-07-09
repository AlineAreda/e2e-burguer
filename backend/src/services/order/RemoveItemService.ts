import prismaClient from "../../prisma";

interface ItemRequest {
  item_id: string;
}

class RemoveItemService {
  async execute({ item_id }: ItemRequest) {
    if (!item_id) {
      throw new Error("ID do item é necessário.");
    }

    try {
      // Verifica se o item existe
      const existingItem = await prismaClient.item.findUnique({
        where: {
          id: item_id,
        },
      });

      if (!existingItem) {
        throw new Error("Item não encontrado.");
      }

      // Remove o item
      const order = await prismaClient.item.delete({
        where: { id: item_id },
      });

      return order;
    } catch (error) {
      console.error("Erro ao remover o item:", error);
      throw new Error("Não foi possível remover o item.");
    }
  }
}

export { RemoveItemService };
