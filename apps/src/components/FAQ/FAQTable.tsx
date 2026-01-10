'use client';

import { useState } from 'react';
import styles from './FAQTable.module.css';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQTableProps {
  items: FAQItem[];
}

export default function FAQTable({ items }: FAQTableProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <div key={item.id} className={styles.faqItem}>
          <div className={styles.itemContent}>
            <div className={styles.numberColumn}>
              <span className={styles.questionNumber}>{String(item.id).padStart(2, '0')}</span>
              {expandedId === item.id && (
                <div className={styles.doubtText}>
                  <p>Still have any doubts?</p>
                  <div className={styles.buttonGroup}>
                    <button className={styles.btnContact}>Contact us</button>
                  </div>
                </div>
              )}
            </div>
            <button
              className={styles.questionButton}
              onClick={() => toggleExpand(item.id)}
            >
              <span className={styles.questionText}>{item.question}</span>
              <span className={styles.icon}>
                <img 
                  src={expandedId === item.id ? "/up.svg" : "/down.svg"} 
                  alt="toggle"
                  style={{ width: expandedId === item.id ? '28px' : '20px', height: expandedId === item.id ? '28px' : '20px' }}
                />
              </span>
            </button>
          </div>
          {expandedId === item.id && (
            <div className={styles.answer}>
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
