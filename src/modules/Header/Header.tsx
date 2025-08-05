import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInfo}>
        <Link to="/">
          <img
            className={styles.headerLogo}
            src={`${import.meta.env.BASE_URL}assets/images/logo.svg`}
            alt="Logo"
          />
        </Link>
        <p>.FrontEnd</p>
      </div>

      <div className={styles.headerPages}>
        <p className={styles.vacanciesPage}>Вакансии FE</p>
        <p className={styles.aboutPage}>
          <img
            className={styles.aboutImg}
            src={`${import.meta.env.BASE_URL}assets/images/user-circle.png`}
            alt="UserLogo"
          />
          Обо мне
        </p>
      </div>
    </header>
  );
}
