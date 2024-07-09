import { Request, Response} from 'express';
import { AuthUserService } from '../../services/user/AuthService';

class AuthUserController {
    async handle(req: Request, res: Response){
        const { email, password } = req.body;

        const authUserService = new AuthUserService();

        // Validação de entrada
        if (!email || !password) {
            return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
        }
        try {
            const auth = await authUserService.execute({
                email,
                password
            });

            return res.json(auth);
        } catch (err) {
            console.error("Erro na autenticação:", err);

            // Personalização do código de status baseado no tipo de erro
            if (err.message === 'Usuário e/ou Senha incorretos.') {
                return res.status(401).json({ error: err.message });
            } else if (err.message === 'Erro ao gerar token.') {
                return res.status(500).json({ error: err.message });
            }

            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
}

export { AuthUserController };
