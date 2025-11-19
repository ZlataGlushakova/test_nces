import React from 'react';
import styles from './LoadingSpinner.module.css';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.spinner} aria-label="Loading">
      <div className={styles.spinnerCircle}></div>
    </div>
  );
};