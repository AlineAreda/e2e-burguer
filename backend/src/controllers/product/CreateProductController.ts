import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";
import prismaClient from "../../prisma";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    const createProductService = new CreateProductService();

    // Validação de entrada
    if (!name || !price || !description || !category_id) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos" });
    }

    //não cadastrar produto com o mesmo nome
    const productAlreadyExists = await prismaClient.product.findFirst({
      where: {
        name: name,
      },
    });

    if (productAlreadyExists) {
      throw new Error("Produto já cadastrada!");
    }

    if (!req.file) {
      return res.status(400).json({ error: "Erro no upload da foto" });
    }

    const { filename: banner } = req.file;


    try {
      const product = await createProductService.execute({
        name,
        price,
        description,
        banner,
        category_id,
      });

      return res.json(product);
    } catch (error) {
      console.error("Erro ao criar produto:", error);

      // Personalização do código de status baseado no tipo de erro
      if (error.message.includes("Categoria não encontrada")) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

export { CreateProductController };
