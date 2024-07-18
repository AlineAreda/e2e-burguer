import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies, destroyCookie } from 'nookies';
import { AuthTokenError } from '../services/errors/AuthTokenError';

// Função para páginas que só usuários logados podem acessar.
export function canSSRAuth<P extends { [key: string]: any }>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);
        const token = cookies['@nextauth.token'];

        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            };
        }

        try {
            return await fn(ctx);
        } catch (err) {
            if (err instanceof AuthTokenError) {
                destroyCookie(ctx, '@nextauth.token');

                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    }
                };
            }

            // Re-throw any other errors for further handling
            throw err;
        }
    };
}

export function isAuthenticated() {
  // Supondo que o token esteja armazenado em cookies ou localStorage
  const token = localStorage.getItem('@nextauth.token'); // ou use cookies se preferir
  return !!token;
}
