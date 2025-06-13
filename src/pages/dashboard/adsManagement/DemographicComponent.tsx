import styles from "./DemographicComponent.module.css";
import { AdFormValues } from "./formik-types/formikTypes";
import { useState } from "react";

interface AdvertDetailsProps {
  values: AdFormValues;
  setFieldValue: <K extends keyof AdFormValues>(
    field: K,
    value: AdFormValues[K],
    shouldValidate?: boolean
  ) => void;
}

const GenderOptions = ["Male", "Female", "Other"];
const AgeRanges = ["All ages", "18–25", "26–35", "35 & above"];
const InterestOptions = [
  "Fashion",
  "Tech",
  "Fitness",
  "Travel",
  "Music",
  "Gaming",
];

export default function DemographicComponent({
  values,
  setFieldValue,
}: AdvertDetailsProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAgeRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (value === "All ages") {
      if (checked) {
        setFieldValue("ageRange", ["All ages", "18–25", "26–35", "35 & above"]);
      } else {
        setFieldValue("ageRange", []);
      }
      return;
    }

    let updated = checked
      ? [...values.ageRange.filter((v) => v !== "All ages"), value]
      : values.ageRange.filter((range) => range !== value);

    setFieldValue("ageRange", updated);
  };

  const handleInterestSelect = (interest: string) => {
    if (values.interest.includes(interest)) return;
    setFieldValue("interest", [...values.interest, interest]);
    setShowDropdown(false);
  };

  const removeInterest = (interest: string) => {
    setFieldValue(
      "interest",
      values.interest.filter((item) => item !== interest)
    );
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.section}>
        <p className={styles.labelUnderline}>Select Gender</p>
        <div className={styles.radioGroup}>
          {GenderOptions.map((option) => (
            <label
              key={option}
              className={`${styles.radioLabel} ${
                values.gender === option ? styles.radioLabelSelected : ""
              }`}
            >
              <input
                type="radio"
                name="gender"
                value={option}
                checked={values.gender === option}
                onChange={() => setFieldValue("gender", option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Interest</label>
        <div className={styles.dropdownWrapper}>
          <div
            className={styles.dropdownTrigger}
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            {values.interest.length > 0
              ? "Change Interest"
              : "Select Interests"}
            <span className={styles.chevron}>▾</span>
          </div>
          {showDropdown && (
            <ul className={styles.dropdown}>
              {InterestOptions.map((interest) => (
                <li
                  key={interest}
                  className={styles.dropdownItem}
                  onClick={() => handleInterestSelect(interest)}
                >
                  {interest}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.tagContainer}>
          {values.interest.map((tag) => (
            <span key={tag} className={styles.tag}>
              • {tag}
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeInterest(tag)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Select Age Range</p>
        <div className={styles.checkboxVertical}>
          {AgeRanges.map((range) => (
            <label key={range} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="ageRange"
                value={range}
                checked={values.ageRange.includes(range)}
                onChange={handleAgeRangeChange}
                className={styles.customCheckbox}
              />
              {range}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
