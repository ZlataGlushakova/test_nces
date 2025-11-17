import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Task Manager
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Все задачи
          </Link>
        </nav>
      </div>
    </header>
  );
};