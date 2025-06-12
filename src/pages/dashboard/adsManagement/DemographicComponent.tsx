import React, { useState } from "react";
import styles from "./DemographicComponent.module.css";
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

const GenderOptions = ["Male", "Female", "Both"];
const AgeRanges = ["All ages", "18–25", "26–35", "35 & above"];
const SelectedTags = ["Music", "Entertainment", "Sports"];

export default function DemographicComponent({
  values,
  setFieldValue,
}: AdvertDetailsProps) {
  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("");

  return (
    <div className={styles.formContainer}>
      {/* Gender */}
      <div className={styles.section}>
        <p className={styles.labelUnderline}>Select Gender</p>
        <div className={styles.radioGroup}>
          {GenderOptions.map((option) => (
            <label key={option} className={styles.radioLabel}>
              <input
                type="radio"
                name="gender"
                value={option}
                checked={gender === option}
                onChange={() => setGender(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Interest */}
      <div className={styles.section}>
        <label className={styles.label}>Interest</label>
        <select className={styles.selectInput}>
          <option>Select Interest</option>
        </select>
        <div className={styles.tagContainer}>
          {SelectedTags.map((tag) => (
            <span key={tag} className={styles.tag}>
              • {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Age Range */}
      <div className={styles.section}>
        <p className={styles.label}>Select Age Range</p>
        <div className={styles.radioVertical}>
          {AgeRanges.map((range) => (
            <label key={range} className={styles.radioLabel}>
              <input
                type="radio"
                name="ageRange"
                value={range}
                checked={ageRange === range}
                onChange={() => setAgeRange(range)}
              />
              {range}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.buttonGroup}></div>
    </div>
  );
}
