import { useState, FormEvent, useContext } from 'react';
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import logoImg from '../../../public/logo.svg';
import styles from '../../../styles/home.module.scss';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  function validatePassword(password: string): boolean {
    const minLength = 8;
    const maxLength = 12;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength &&
           password.length <= maxLength &&
           hasUpperCase &&
           hasNumber &&
           hasSpecialChar;
  }

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (name === '' || email === '' || password === '') {
      toast.warning("Preencha todos os campos");
      return;
    }

    if (!validatePassword(password)) {
      toast.warning("A senha deve conter entre 8 e 12 caracteres, incluindo ao menos uma letra maiúscula, um número e um carácter especial.");
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password
    };

    await signUp(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>E2E Burguer - Faça seu cadastro agora!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo E2E Burguer" />
        <div className={styles.login}>
          <h1>Crie sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              data-testid="input-name"
              id="seu-nome"
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              id="seu-email"
              data-testid="input-email"
              placeholder="Digite seu e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="sua-senha"
              data-testid="input-senha"
              placeholder="Sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              id="btn-cadastrar"
              data-testid="botton-cadastrar"
              type="submit"
              loading={loading}
            >
              Cadastrar
            </Button>
          </form>
          <Link href="/">
            <span className={styles.text}>Já possui uma conta? Faça seu login</span>
          </Link>
        </div>
      </div>
    </>
  );
}
