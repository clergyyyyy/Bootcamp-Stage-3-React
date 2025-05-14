'use client';

import { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  Timestamp,
  doc,
} from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { useAuth } from '@/app/AuthProvider';
import InputForm from '@/components/InputForm';
import RecordList, { RecordItem } from '@/components/RecordList';
import Total from '@/components/Total';
import Link from 'next/link';
import styles from './page.module.css';

const db = getFirestore(app);

export default function AccountingPage() {
  const { user } = useAuth();
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!user) return; 

    const colRef = collection(db, 'users', user.uid, 'records');
    const q = query(colRef, orderBy('createdAt', 'asc'));

    const unsub = onSnapshot(q, snap => {
      let sum = 0;
      const list: RecordItem[] = [];

      snap.forEach(d => {
        const data = d.data() as Omit<RecordItem, 'id'> & { createdAt: Timestamp };
        list.push({ id: d.id, ...data });
        sum += data.type === '支出' ? -data.amount : data.amount;
      });
      setRecords(list);
      setTotal(sum);
    });
    return unsub;
  }, [user]);

  const handleAddRecord = async (
    type: '收入' | '支出',
    amount: number,
    description: string,
  ) => {
    if (!user) return alert('請先登入');
    await addDoc(collection(db, 'users', user.uid, 'records'), {
      type,
      amount,
      description,
      createdAt: Timestamp.now(),
    });
  };
  
  const handleDelete = async (id: string) => {
    if (!user) return;
    await deleteDoc(doc(db, 'users', user.uid, 'records', id));
  };

  if (!user) return <p style={{ padding: 40 }}>請先登入後再查看帳本。</p>;

  return (
    <main className={styles.container}>
      <div className={styles.inputFormContainer}>
        <InputForm onAddRecord={handleAddRecord} />
      </div>
      <div className={styles.recordListContainer}>
        <RecordList records={records} onDelete={handleDelete} />
      </div>
      <div className={styles.total}>
        <Total total={total} />
        <Link href="/">
          <button className="button">回到首頁</button>
        </Link>
      </div>
    </main>
  );
}
