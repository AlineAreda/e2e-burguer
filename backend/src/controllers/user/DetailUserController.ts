import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

class DetailUserController {
    async handle(req: Request, res: Response) {

      const detailUserService = new DetailUserService();

   // const user = await detailUserService.execute(req.user_id); 
    const user = await detailUserService.execute(req.query.user_id as string);

      return res.json(user);





// codigo antigo

        // Obtenção do user_id - ajuste conforme a fonte do user_id (ex: params, query)
   //     const user_id = req.params.user_id; // ou req.query.user_id, dependendo do design da sua API

  //      const detailUserService = new DetailUserService();

  //      try {
  //          const user = await detailUserService.execute(user_id);
 //           return res.json(user);
 //       } catch (error) {
  //          console.error("Erro ao buscar os detalhes do usuário:", error);

  //          // Personalização do código de status baseado no tipo de erro
 //           if (error.message === 'Usuário não encontrado.') {
  //              return res.status(404).json({ error: error.message });
  //          }

  //          return res.status(500).json({ error: "Erro interno no servidor" });
 //       }
    }
}

export { DetailUserController };
