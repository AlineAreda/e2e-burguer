import { useContext, FormEvent, useState } from 'react';

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import logoImg from '../../public/logo.svg';

import styles from '../../styles/home.module.scss';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

import { toast } from 'react-toastify';

import { AuthContext } from '../contexts/AuthContext';

import { canSSRGuest } from '../utils/canSSRGuest';


export default function Home() {
  const { signIn } = useContext(AuthContext)


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.warning("Preencha os campos!")
      return;
    }

    setLoading(true)

    let data = {
      email,
      password
    }

    await signIn(data);


    setLoading(false)

  }

  return (
    <>
      <Head>
        <title>E2E Burguer - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo E2E Burguer" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              id="email"
              data-testid="email-input"
              placeholder="Digite seu e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="senha"
              data-testid="senha-input"
              placeholder="Sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              id="btn-acessar"
              data-testid="botton-submit"
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>
          </form>
          <Link href="/signup">
            <span className={styles.text}>Não possui uma conta? Cadastre-se</span>
          </Link>
        </div>
      </div>
    </>

  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {

  return {
    props: {}
  }

})