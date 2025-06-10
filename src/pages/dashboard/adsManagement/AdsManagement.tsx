import React, { useState } from "react";
import { ReactComponent as CheckIcon } from "../../../assets/Ellipse1593.svg";
import DemographicComponent from "./DemographicComponent";
import DurationComponent from "./DurationComponent";
import PreviewComonent from "./PreviewComponent";
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

const mediaOptions = ["Single Image", "Carousel", "Banner", "Video", "Text"];

export default function AdsManagement() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
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

              {index < steps.length - 1 && <div className={styles.arrow}></div>}
            </li>
          ))}
        </ul>
      </aside>

      <main className={styles.form}>
        {activeStep === 0 && (
          <>
            {/* Media Option Selector */}
            <div className={styles.mediaOptions}>
              {mediaOptions.map((media) => (
                <label key={media} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={selectedMedia === media}
                    onChange={() =>
                      setSelectedMedia(selectedMedia === media ? null : media)
                    }
                  />
                  {media}
                </label>
              ))}
            </div>

            {/* Title Input */}
            <input
              type="text"
              placeholder="Title"
              className={styles.titleInput}
            />
            {/* 
           
            <div className={styles.editorControls}>
              <button>
                <b>B</b>
              </button>
              <button>
                <i>I</i>
              </button>
              <button>
                <u>U</u>
              </button>
              <button title="Align Left">🡐</button>
              <button title="Center">☰</button>
              <button title="Align Right">🡒</button>
              <button title="Justify">≡</button>
              <button title="Bullet List">• List</button>
              <button title="Numbered List">1. List</button>
            </div>

           
            <textarea
              placeholder="Enter advert text..."
              className={styles.textArea}
            /> */}

            {/* Upload Section */}
            {selectedMedia === "Single Image" && (
              <div className={styles.uploadBoxLeft}>
                <label className={styles.uploadLabel}>
                  <input type="file" accept="image/*" />
                  <span className={styles.plus}>+</span>
                  <p className={styles.uploadText}>Upload a single image</p>
                </label>
              </div>
            )}

            {selectedMedia === "Carousel" && (
              <div className={styles.carouselWrapper}>
                <div className={styles.carousel}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <label key={idx} className={styles.uploadBoxSmall}>
                      <input type="file" accept="image/*" />
                      <div className={styles.plus}>+</div>
                      <p className={styles.uploadText}>Image {idx + 1}</p>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {selectedMedia === "Banner" && (
              <div className={styles.uploadBoxFull}>
                <label className={styles.uploadLabel}>
                  <input type="file" accept="image/*" />
                  <span className={styles.plus}>+</span>
                  <p className={styles.uploadText}>Upload a banner image</p>
                </label>
              </div>
            )}

            {selectedMedia === "Video" && (
              <div className={styles.uploadVideoBox}>
                <label className={styles.uploadLabel}>
                  <input type="file" accept="video/*" />
                  <span className={styles.videoIcon}>🎬</span>
                  <p className={styles.uploadText}>Upload video (MP4, MOV)</p>
                </label>
              </div>
            )}

            {selectedMedia === "Text" && (
              <p className={styles.infoText}>
                No media upload needed for plain text.
              </p>
            )}

            {/* Link Input */}
            <input type="url" placeholder="Link" className={styles.linkInput} />

            {/* Text CTA for "Text" Media */}
            {selectedMedia === "Text" && (
              <div className={styles.ctaWrapper}>
                <label className={styles.ctaLabel}>Call to Action</label>
                <input
                  type="text"
                  placeholder="Enter CTA here..."
                  className={styles.ctaInput}
                />
              </div>
            )}

            {/* Next Button */}
            <button onClick={handleNext} className={styles.nextBtn}>
              Next
            </button>
          </>
        )}

        {activeStep === 1 && <DemographicComponent handleNext={handleNext} />}
        {activeStep === 2 && <DurationComponent handleNext={handleNext} />}
        {activeStep === 3 && <PreviewComonent handleNext={handleNext} />}
      </main>
    </div>
  );
}
