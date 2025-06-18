import React from 'react';
import styles from './StepSidebar.module.css';

export interface Step {
  id: number;
  heading: string;
  text: string;
  icon?: string; // Optional icon for the step
}

interface StepSidebarProps {
  steps: Step[];
  activeStep: number;
  onStepClick: (index: number) => void;
}

const StepSidebar: React.FC<StepSidebarProps> = ({ steps, activeStep, onStepClick }) => (
  <aside className={styles.stepPanel}>
    <ul className={styles.stepList}>
      {steps.map((step, index) => (
        <li
          key={step.id}
          className={`${styles.stepItem} ${index === activeStep ? styles.active : ''}`}
          onClick={() => onStepClick(index)}
        >
         {/* <span className={styles.bullet}>{index < activeStep ? '✓' : index + 1}</span> */}
            {step.icon && <img src={step.icon} alt={step.heading} className={styles.stepIcon} />}
          <div className={styles.stepContent}>
            <p className={styles.stepHeading}>{step.heading}</p>
            <p className={styles.stepDescription}>{step.text}</p>
          </div>
          {index < steps.length - 1 && <div className={styles.arrow}></div>}
        </li>
      ))}
    </ul>
  </aside>
);

export default StepSidebar;
