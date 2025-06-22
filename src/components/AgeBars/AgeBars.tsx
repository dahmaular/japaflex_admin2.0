import React from "react";
import styles from "./AgeBars.module.css";

interface AgeBar {
  label: string;
  value: number;
}

interface AgeBarsProps {
  data: AgeBar[];
  title?: string;
}

const AgeBars: React.FC<AgeBarsProps> = ({ data, title = "Age Distribution" }) => {
  React.useEffect(() => {
    console.log('AgeBars mounted');
    console.log('AgeBars data:', data);
  }, [data]);
  
  if (!data || data.length === 0) {
    console.log('No data provided to AgeBars component');
    return <div className={styles.ageBars}>No age distribution data available</div>;
  }

  return (
    <section className={styles.ageBars}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.barsContainer}>
        {data.map((bar) => (
          <div key={bar.label} className={styles.barRow}>
            <span className={styles.label}>{bar.label}</span>
            <div className={styles.barTrack} role="progressbar" aria-valuenow={bar.value} aria-valuemin={0} aria-valuemax={100}>
              <div
                className={styles.bar}
                style={{ width: `${Math.max(bar.value, 1)}%` }}
              />
            </div>
            <span className={styles.value}>{bar.value}%</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AgeBars;
