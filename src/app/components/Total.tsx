'use client';

export interface TotalProps {
  total: number;
}

export default function Total({ total }: TotalProps) {
  return (
    <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>
      小計：{total}
    </div>
  );
}
