import React, { useState } from "react";
import styles from "./AdsTable.module.css";

const dummyData = [
  {
    id: 1,
    image: "https://via.placeholder.com/40",
    title: "Coca Cola",
    subtitle: "Summer Time Ad",
    dateCreated: "06-03-1990",
    daysLeft: 12,
    status: "Active",
  },
];

export default function AdsTable() {
  const [selected, setSelected] = useState<number[]>([]);

  const isAllSelected = selected.length === dummyData.length;

  const toggleAll = () => {
    setSelected(isAllSelected ? [] : dummyData.map((row) => row.id));
  };

  const toggleOne = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <table className={styles.customTable}>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={toggleAll}
            />
          </th>
          <th>AD Details</th>
          <th>Date Created</th>
          <th>Days Left</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {dummyData.map((row) => (
          <tr key={row.id}>
            <td>
              <input
                type="checkbox"
                checked={selected.includes(row.id)}
                onChange={() => toggleOne(row.id)}
              />
            </td>
            <td>
              <div className={styles.adDetails}>
                <img src={row.image} alt={row.title} />
                <div>
                  <strong>{row.title}</strong>
                  <p>{row.subtitle}</p>
                </div>
              </div>
            </td>
            <td>{row.dateCreated}</td>
            <td>{row.daysLeft}</td>
            <td>
              <span className={styles.badge}>{row.status}</span>
            </td>
            <td>
              <button className={styles.ellipsisBtn} aria-label="More options">
                ...
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
