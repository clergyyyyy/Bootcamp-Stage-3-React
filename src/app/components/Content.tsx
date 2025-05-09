'use client';

import React from 'react';
import styles from "./Content.module.css";


type ContentProps = {
    onSelectPage?: (page: string) => void;
  };
  

  const Content: React.FC<ContentProps> = ({ onSelectPage }) => {
    return (
      <div className={styles.content}>
        <h1 className="text-xl font-bold">歡迎光臨我的專案</h1>
        <button className="hover:underline" onClick={() => onSelectPage?.('records')}>
          紀錄
        </button>
      </div>
    );
  }

export default Content;