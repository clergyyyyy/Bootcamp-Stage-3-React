'use client';

import styles from "./RecordList.module.css";

export interface RecordItem {
  id: number;
  type: '收入' | '支出';
  amount: number;
  description: string;
}

export interface RecordListProps {
  records: RecordItem[];
  onDelete: (id: number) => void;
}

export default function RecordList({ records, onDelete }: RecordListProps) {
console.log('RecordList props.records:', records);
  if (records.length === 0) {
    return <p>目前沒有任何記錄</p>;
  }

  return (
    <div className={styles.recordListContainer}>
      <ul className={styles.listReset}>
        {records.map(r => (
          <li key={r.id} className={styles.recordRow}>
            <span className={styles.category}>{r.type}</span>
            <span className={styles.amount}style={{ 
      color: r.type === '支出' ? 'red' : 'green', 
    }}
  >
    {r.type === '支出' ? '-' : '+'}{r.amount}
  </span>
  <span className={styles.description}>{r.description}</span>
  <button className="button" onClick={() => {
    if (window.confirm('請確認是否刪除這筆紀錄？')) {
      onDelete(r.id);
    }
  }}>刪除</button>
</li>
      ))}
    </ul>
    </div>
  );
}
