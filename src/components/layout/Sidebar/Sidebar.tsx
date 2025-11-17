import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <Link 
          to="/" 
          className={`${styles.navItem} ${location.pathname === '/' ? styles.active : ''}`}
        >
          📝 Все задачи
        </Link>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Фильтры</h3>
          <Link to="/?status=todo" className={styles.navItem}>
            ⏳ К выполнению
          </Link>
          <Link to="/?status=inProgress" className={styles.navItem}>
            🔄 В процессе
          </Link>
          <Link to="/?status=done" className={styles.navItem}>
            ✅ Выполненные
          </Link>
        </div>
      </nav>
    </aside>
  );
};