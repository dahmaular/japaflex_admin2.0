import { useState } from "react";
import styles from "./DurationComponent.module.css";
import Button from "../../../ui/components/button/button";
import { AdFormValues } from "./formik-types/formikTypes";

interface AdvertDetailsProps {
  values: AdFormValues;
  setFieldValue: <K extends keyof AdFormValues>(
    field: K,
    value: AdFormValues[K],
    shouldValidate?: boolean
  ) => void;
}

export const daysOptions = [
  { label: "1 Day", value: 1 },
  { label: "3 Days", value: 3 },
  { label: "5 Days", value: 5 },
  { label: "7 Days", value: 7 },
  { label: "10 Days", value: 10 },
  { label: "14 Days", value: 14 },
];

export default function DurationComponent({
  values,
  setFieldValue,
}: AdvertDetailsProps) {
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");

  return (
    <div className={styles.formContainer}>
      <div className={styles.section}>
        <label className={styles.label}>Select Number Of Days</label>
        <select
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className={styles.selectInput}
        >
          <option value="">Select Days</option>
          {daysOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Budget</label>
        <input
          type="text"
          placeholder="Enter Amount"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className={styles.textInput}
        />
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Estimated Reach</p>
        <h2 className={styles.reachText}>23,000 - 30,000</h2>
      </div>

      <div className={styles.buttonGroup}></div>
    </div>
  );
}
