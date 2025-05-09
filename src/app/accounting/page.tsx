'use client';

import { useState } from 'react';

import InputForm, { InputFormProps } from '@/components/InputForm';
import RecordList, { RecordItem } from '@/components/RecordList';
import Total from '@/components/Total';
import Link from 'next/link';
import styles from './page.module.css';

export default function AccountingPage() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [total, setTotal] = useState(0);

  const handleAddRecord: InputFormProps['onAddRecord'] = (type, amount, description) => {
    console.log('父元 handleAddRecord:', { type, amount, description });
    const newRecord: RecordItem = {
      id: Date.now(),
      type,
      amount,
      description,
    };
    setRecords(prev => {
      const next = [...prev, newRecord];
      console.log('父元 setRecords 裡的 next records：', next);
      return next;
    });
    setTotal(prev => prev + (type === '支出' ? -amount : amount));
  };

  const handleDelete = (id: number) => {
    setRecords(prev => prev.filter(r => r.id !== id));
    const removed = records.find(r => r.id === id)!;
    setTotal(prev => prev - (removed.type === '支出' ? -removed.amount : removed.amount));
  };

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
