import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        if (!name) {
            throw new Error('Nome, e-mail e senha são obrigatórios.');
        }

        const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !EMAIL_REGEX.test(email)) {
            throw new Error('Formato de e-mail inválido');
        }

        const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
        if (!password || !PASSWORD_REGEX.test(password)) {
            throw new Error('Senha inválida. A senha deve conter entre 8 e 12 caracteres, incluindo pelo menos uma letra maiúscula, um número e um caractere especial.');
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: { email: email }
        });

        if (userAlreadyExists) {
            throw new Error('E-mail já cadastrado');
        }

        const passwordHash = await hash(password, 8); 
        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        return user;
    }
}

export { CreateUserService };
