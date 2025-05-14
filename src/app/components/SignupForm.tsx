'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './SigninForm.module.css'; 
import { getAuth } from 'firebase/auth';
import { app }    from '@/lib/firebase';
import { FirebaseError } from 'firebase/app';

const auth = getAuth(app);

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      
      setEmail(''); setPassword('');
      alert('註冊成功！歡迎加入 😊');
      
    } catch (err) {
          const e = err as FirebaseError;  // 或先寫 err as unknown 再判斷
          setError(e.message);
        } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <h2 className="section-title">註冊帳戶</h2>
      <form onSubmit={handleSignup}>
      <div className="formGroup">
        <label htmlFor="signup-email">電郵</label>
        <input
          name="name"
          id="signup-email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        </div>
        <div className="formGroup">
        <label htmlFor="signup-password">密碼</label>
        <input
          name="name"
          id="signup-password"
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
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
          {loading ? '註冊中…' : '註冊'}
        </button>
      </form>
    </section>
  );
}
