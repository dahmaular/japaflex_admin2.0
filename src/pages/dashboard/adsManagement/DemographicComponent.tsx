import React, { useState } from "react";
import styles from "./DemographicComponent.module.css";
import Button from "../../../ui/components/button/button";

const GenderOptions = ["Male", "Female", "Both"];
const AgeRanges = ["All ages", "18–25", "26–35", "35 & above"];
const SelectedTags = ["Music", "Entertainment", "Sports"];

export default function DemographicComponent({
  handleNext,
  handleBack,
}: {
  handleNext: () => void;
  handleBack: () => void;
}) {
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

      <div className={styles.buttonGroup}>
        <Button variant="outline" size="md" onClick={handleBack}>
          Previous
        </Button>
        <Button variant="primary" size="md" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
