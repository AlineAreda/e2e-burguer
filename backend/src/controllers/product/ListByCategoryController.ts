import { Request, Response } from 'express';
import { ListByCategoryService } from '../../services/product/ListByCategoryService';

class ListByCategoryController {
    async handle(req: Request, res: Response) {
        const category_id = req.params.category_id as string;

      
        if (!category_id) {
            return res.status(400).json({ message: "category_id válido é obrigatório!" });
        }

        const listByCategory = new ListByCategoryService();

        try {
            const products = await listByCategory.execute({ category_id });
            return res.json(products);
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
}

export { ListByCategoryController };
