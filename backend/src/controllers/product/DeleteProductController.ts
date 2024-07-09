import { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";

class DeleteProductController {
  async handle(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    
    const deleteProductService = new DeleteProductService();
    
    try {
      const product = await deleteProductService.execute({ id }); 
      return res.status(204).json({ message: "Produto deletado com sucesso!", product });
    } catch (error) { 
      return res.status(400).json({ message: error.message });
    }
  }
}

export { DeleteProductController };