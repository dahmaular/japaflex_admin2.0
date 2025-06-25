import React from "react";
import styles from "./StatCard.module.css";
import { ArrowUp, ArrowDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  percent: number;
  icon: LucideIcon;
  sublabel?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, percent, icon: Icon, sublabel }) => {
  const isPositive = percent >= 0;
  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <span className={styles.label}>{label}</span>
        <Icon className={styles.icon} size={24} />
      </div>
      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
        <span className={`${styles.percent} ${isPositive ? styles.positive : styles.negative}`}>
          {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          {Math.abs(percent)}%
        </span>
      </div>
      <div className={styles.sublabel}>{sublabel || "This week"}</div>
    </div>
  );
};

export default StatCard;
