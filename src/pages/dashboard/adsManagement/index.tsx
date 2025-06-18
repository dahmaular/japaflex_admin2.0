import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../../../ui/components/button/button";
import StepSidebar, { Step } from "./StepSidebar";
import DemographicComponent from "./DemographicComponent";
import DurationComponent from "./DurationComponent";
import PreviewComponent from "./PreviewComponent";
import AdvertDetails from "./AdvertDetails";
import { AdFormValues } from "./types";
import styles from "./styles.module.css";
import Group12 from "../../../assets/Group12.png";
import Group13 from "../../../assets/Group13.png";

const steps: Step[] = [
  { id: 1, icon: Group12, heading: "Advert Details", text: "Provide details of your ad" },
  { id: 2, icon: Group13, heading: "Demographic", text: "Select your target audience" },
  { id: 3, icon: Group13, heading: "Duration", text: "Select ad duration" },
  { id: 4, icon: Group13, heading: "Preview", text: "See how your ad looks" },
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
        <StepSidebar
          steps={steps}
          activeStep={activeStep}
          onStepClick={setActiveStep}
        />
        <Formik
          initialValues={{
            mediaType: "single-image",
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
          } as AdFormValues}
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
