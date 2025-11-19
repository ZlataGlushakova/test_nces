import React from 'react';
import { Outlet } from 'react-router-dom'; // Добавь этот импорт
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import styles from './Layout.module.css';

interface LayoutProps {
  children?: React.ReactNode; // Сделай children опциональным
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>
          {children || <Outlet />} {/* Рендерим children или Outlet */}
        </main>
      </div>
    </div>
  );
};