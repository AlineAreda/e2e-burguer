import { createContext, ReactNode, useState, useEffect } from 'react';

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router';

import { toast } from 'react-toastify';


type AuthContextData = {
  user: UserProps | undefined; // Add undefined as a possible type for user
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type SignUpProps = {
  name: string;
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)


export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  } catch {
    console.log('erro ao deslogar')
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | undefined>(undefined)
  const isAuthenticated = !!user; //converter a variavel em boleano

  useEffect(() => {
    //tentar pegar token no cookie
    const { '@nextauth.token': token } = parseCookies();

    if (token) {
      api.get('/me').then(response => {
        const { id, name, email } = response.data;

        setUser({
          id,
          name,
          email
        })
      })
        .catch(() => {
          //se der erro deslogar o usuário
          signOut()
        })
    }
  }, [])

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', {
        email,
        password
      })

      const { id, name, token } = response.data;
      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/" // Quais caminhos terao acesso ao cookie
      })

      setUser({
        id,
        name,
        email,
      })
      //Passar para proximas requisiçoes o nosso token
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success('Login realizado com sucesso!')
      
      //Redirecionar o user para /dashboard
      Router.push('/dashboard')


    } catch (err) {
      toast.error("Erro ao acessar!")
      console.log("ERRO AO ACESSAR ", err)
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {

      const response = await api.post('/users', {
        name,
        email,
        password
      })

      toast.success("Cadastro realizado com sucesso!")

      Router.push('/')

    } catch (err) {
      toast.error("Erro ao cadastrar!")
      console.log("Erro ao cadastrar ", err)
    }


  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}