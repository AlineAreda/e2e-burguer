import { useContext } from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContext';

export function Header() {
  const { signOut, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const handleLogoClick = () => {
    const redirectTo = isAuthenticated ? '/dashboard' : '/';
    router.push(redirectTo);
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img src='/logo.svg' width={190} height={60} alt='logo' data-testid="dashboard-link" />
        </div>

        <nav className={styles.menuNav}>
          <Link href="/category" data-testid="category-link">
            Categoria
          </Link>

          <Link href="/product" data-testid="cardapio-link">
            Cardápio
          </Link>

          <button onClick={signOut}>
            <FiLogOut color="#FFF" size={24} data-testid="logout-button" />
          </button>
        </nav>
      </div>
    </header>
  );
}
