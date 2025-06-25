import React, { useState } from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const [selected, setSelected] = useState<"week" | "year">("week");

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Analytics</h1>
      <div className={styles.toggleGroup}>
        <button
          className={`${styles.toggle} ${selected === "week" ? styles.active : ""}`}
          onClick={() => setSelected("week")}
        >
          Week
        </button>
        <button
          className={`${styles.toggle} ${selected === "year" ? styles.active : ""}`}
          onClick={() => setSelected("year")}
        >
          Year
        </button>
      </div>
    </div>
  );
};

export default Header;
