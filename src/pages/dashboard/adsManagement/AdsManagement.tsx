import React, { useState } from "react";
import { ReactComponent as CheckIcon } from "../../../assets/Ellipse1593.svg";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../../../ui/components/button/button";
import DemographicComponent from "./DemographicComponent";
import DurationComponent from "./DurationComponent";
import PreviewComponent from "./PreviewComponent";
import AdvertDetails from "./AdvertDetails";
import styles from "./styles.module.css";

const steps = [
  {
    id: 1,
    heading: "Advert Details",
    text: "Provide details of your ad",
  },
  {
    id: 2,
    heading: "Demographic",
    text: "kindly select your target audience",
  },
  {
    id: 3,
    heading: "Duration",
    text: "Select how long you want this ad to run",
  },
  {
    id: 4,
    heading: "Preview",
    text: "See how your add looks",
  },
];

export default function AdsManagement() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () =>
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <h1 className={styles.adHeading}>Create a New Ad</h1>
      <div className={styles.container}>
        <aside className={styles.stepPanel}>
          <ul className={styles.stepList}>
            {steps.map((step, index) => (
              <li
                key={step.id}
                className={`${styles.stepItem} ${
                  index <= activeStep ? styles.active : ""
                }`}
                onClick={() => setActiveStep(index)}
              >
                <span className={styles.bullet}>
                  {index <= activeStep && (
                    <CheckIcon className={styles.checkIcon} />
                  )}
                </span>

                <div className={styles.stepContent}>
                  <p className={styles.stepHeading}>{step.heading}</p>
                  <p className={styles.stepDescription}>{step.text}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className={styles.arrow}></div>
                )}
              </li>
            ))}
          </ul>
        </aside>

        <Formik
          initialValues={{
            mediaType: "", // <-- changed here from [] to ""
            title: "",
            link: "",
            cta: "",
            upload: null,
            carousel: [],
            banner: null,
            video: null,
            gender: "",
            interest: [],
            ageRange: [],
            days: "",
            budget: "",
          }}
          validationSchema={Yup.object({})}
          onSubmit={(values) => {
            console.log("Final Submission", values);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className={styles.form}>
              {activeStep === 0 && (
                <AdvertDetails values={values} setFieldValue={setFieldValue} />
              )}
              {activeStep === 1 && (
                <DemographicComponent
                  values={values}
                  setFieldValue={setFieldValue}
                />
              )}
              {activeStep === 2 && (
                <DurationComponent
                  values={values}
                  setFieldValue={setFieldValue}
                />
              )}
              {activeStep === 3 && <PreviewComponent values={values} />}

              <div className={styles.buttonGroup}>
                {activeStep > 0 && (
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    type="button"
                    size="lg"
                  >
                    Previous
                  </Button>
                )}
                {activeStep < steps.length - 1 ? (
                  <Button onClick={handleNext} type="button" size="lg">
                    Next
                  </Button>
                ) : (
                  <Button type="submit">Submit</Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
