'use client';

import { useRouter } from 'next/navigation';
import Navigation from './components/Navigation';
import "./globals.css";
import "./page.module.css";

export default function Home() {
  const router = useRouter();

  const handleGoToAccounting = () => {
    router.push('/accounting');
  };

  return (
    <main>
      <Navigation />
      <section style={{ padding: '2rem' }}>
        <p>歡迎光臨我的頁面</p>
      </section>
      <button className="button"
          onClick={handleGoToAccounting}
        >
          紀錄
        </button>
    </main>
  );
}
