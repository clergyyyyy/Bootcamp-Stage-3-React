'use client';

import React from 'react';
import styles from "./Navigation.module.css";

type NavigationProps = {
  onSelectPage?: (page: string) => void;
};

const Navigation: React.FC<NavigationProps> = ({  }) => {
    return (
        <nav className={styles.navbar}>
        <h1 className="text-xl font-bold">React 練習用專案</h1>
      </nav>
    );
  };

export default Navigation;