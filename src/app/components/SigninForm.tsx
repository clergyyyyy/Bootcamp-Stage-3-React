'use client';

import { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase';
import styles from './SigninForm.module.css';
import { useRouter } from 'next/navigation';
import { FirebaseError } from 'firebase/app';

const auth = getAuth(app);

export default function SigninForm() {
  const [email, setEmail]     = useState('');
  const [password, setPass]   = useState('');
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser]       = useState<null | { email: string }>(null);

  const router = useRouter();

  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      if (u) setUser({ email: u.email! });
      else   setUser(null);
    });
    return unsub;
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      setEmail(''); setPass('');
    } catch (err) {
      const e = err as FirebaseError;  // 或先寫 err as unknown 再判斷
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('已成功登出');
    } catch (err) {
      console.error(err);
    }
  };

  if (user) {
    return (
      <section className={styles.container}>
        <h1>您已經使用 {user.email} 登入</h1>
        <div>
          <button className="button" onClick={() => router.push('/accounting')}>立刻開始</button>
          <button className="button" onClick={handleLogout}>登出</button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <h2 className="section-title">登入系統</h2>
      <form onSubmit={handleLogin}>
        <div className="formGroup">
          <label htmlFor="login-email">電郵</label>
          <input
            id="login-email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="login-password">密碼</label>
          <input
            id="login-password"
            type="password"
            required
            value={password}
            onChange={e => setPass(e.target.value)}
          />
        </div>

        {error && (
          <p className={styles.errorMsg}
            style={{
              color: 'red',
              display: 'flex',
              flexWrap: 'wrap',   
            }}
          >
            {error}
          </p>
        )}

        <button type="submit" className="button" disabled={loading}>
          {loading ? '登入中…' : '登入'}
        </button>
      </form>
    </section>
  );
}
