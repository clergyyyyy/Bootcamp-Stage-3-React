'use client';

import { useState } from 'react';

export interface InputFormProps {
  onAddRecord: (type: '收入' | '支出', amount: number, description: string) => void;
}

export default function InputForm({ onAddRecord }: InputFormProps) {
  const [type, setType] = useState<'收入' | '支出'>('收入');
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const handleAdd = () => {
    console.log('InputForm handleAdd:', { type, amount, description });
    if (amount > 0 && description.trim() !== '') {
      onAddRecord(type, amount, description);
      setAmount(0);
      setDescription('');
    }
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <select value={type} onChange={e => setType(e.target.value as '收入' | '支出')}>
        <option value="收入">收入</option>
        <option value="支出">支出</option>
      </select>
      <input
        type="number"
        min={0}
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
        placeholder="金額"
        style={{ marginLeft: '0.5rem' }}
      />
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="項目名稱"
        style={{ marginLeft: '0.5rem' }}
      />
      <button className="button" onClick={handleAdd} style={{ marginLeft: '0.5rem' }}>
        新增記錄
      </button>
      
    </div>
  );
}




