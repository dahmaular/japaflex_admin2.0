import React, { useState } from "react";
import TextEditor from "./TextEditor";
import { ReactComponent as CloseImageUpload } from "../../../assets/CloseImageUpload.svg";
import { ReactComponent as UploadImage } from "../../../assets/UploadImage.svg";
import { ReactComponent as AddImage } from "../../../assets/AddImage.svg";
import { ReactComponent as UploadVideo } from "../../../assets/UploadVideo.svg";
import { AdFormValues } from "./formik-types/formikTypes";
import styles from "./AdvertDetails.module.css";

interface Props {
  values: AdFormValues;
  setFieldValue: (field: keyof AdFormValues, value: any) => void;
}

const mediaOptions = ["Single Image", "Carousel", "Banner", "Video", "Text"];

export default function AdvertDetails({ values, setFieldValue }: Props) {
  const [carouselImages, setCarouselImages] = useState<(File | null)[]>(
    values.carousel?.length ? values.carousel : [null]
  );

  const handleMediaSelect = (option: string) => {
    setFieldValue("mediaType", option);
    if (option !== "Carousel") setCarouselImages([]);
    if (option === "Carousel") setCarouselImages([null]);
  };

  const selectedMedia = values.mediaType;

  return (
    <div className={styles.wrapper}>
      {/* Media type options */}
      <div className={styles.mediaOptions}>
        {mediaOptions.map((option) => (
          <label
            key={option}
            className={styles.option}
            htmlFor={`media-${option}`}
          >
            <input
              type="radio"
              id={`media-${option}`}
              name="mediaType"
              value={option}
              checked={values.mediaType === option}
              onChange={() => handleMediaSelect(option)}
            />
            {option}
          </label>
        ))}
      </div>

      {/* Title input */}
      <input
        type="text"
        placeholder="Title"
        className={styles.titleInput}
        value={values.title}
        onChange={(e) => setFieldValue("title", e.target.value)}
      />

      <TextEditor values={values} setFieldValue={setFieldValue} />

      {/* Upload Areas by Media Type */}
      {selectedMedia === "Single Image" && (
        <label className={styles.uploadBox} htmlFor="single-upload">
          {values.upload ? (
            <div className={styles.imagePreview}>
              <img src={URL.createObjectURL(values.upload)} alt="preview" />
              <button
                type="button"
                className={styles.cancelButton}
                onClick={(e) => {
                  e.preventDefault();
                  setFieldValue("upload", null);
                }}
              >
                <CloseImageUpload />
              </button>
            </div>
          ) : (
            <>
              <UploadImage className={styles.uploadIcon} />
              <p>
                <span className={styles.greenText}>Upload</span> or drag and
                drop file here
                <br />
                JPG, PNG (max 6MB)
              </p>
            </>
          )}
          <input
            type="file"
            id="single-upload"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={(e) =>
              setFieldValue("upload", e.target.files?.[0] || null)
            }
          />
        </label>
      )}

      {selectedMedia === "Carousel" && (
        <div className={styles.carouselContainer}>
          {carouselImages.map((file, index) => (
            <label key={index} className={styles.uploadBox}>
              {file ? (
                <div className={styles.imagePreview}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`carousel-${index}`}
                  />
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => {
                      const updated = [...carouselImages];
                      updated.splice(index, 1);
                      setCarouselImages(updated);
                      setFieldValue("carousel", updated);
                    }}
                  >
                    <CloseImageUpload />
                  </button>
                </div>
              ) : (
                <>
                  <UploadImage className={styles.uploadIcon} />
                  <p>
                    <span className={styles.greenText}>Upload</span> or drag and
                    drop file
                    <br />
                    JPG, PNG (max 6MB)
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className={styles.hiddenInput}
                onChange={(e) => {
                  const newFile = e.target.files?.[0];
                  if (!newFile) return;
                  const updated = [...carouselImages];
                  updated[index] = newFile;
                  setCarouselImages(updated);
                  setFieldValue("carousel", updated);
                }}
              />
            </label>
          ))}

          {/* Add new slot */}
          <button
            type="button"
            className={styles.addMoreBox}
            onClick={() => {
              const updated = [...carouselImages, null];
              setCarouselImages(updated);
              setFieldValue("carousel", updated);
            }}
          >
            <AddImage className={styles.plusIcon} />
          </button>
        </div>
      )}

      {selectedMedia === "Banner" && (
        <label className={styles.uploadBanner} htmlFor="banner-upload">
          {values.banner ? (
            <div className={styles.imagePreview}>
              <img src={URL.createObjectURL(values.banner)} alt="banner" />
              <button
                type="button"
                className={styles.cancelButton}
                onClick={(e) => {
                  e.preventDefault();
                  setFieldValue("banner", null);
                }}
              >
                <CloseImageUpload />
              </button>
            </div>
          ) : (
            <>
              <UploadImage className={styles.uploadIcon} />
              <p>
                <span className={styles.greenText}>Upload</span> or drag and
                drop file here
                <br />
                JPG, PNG (max 6MB)
              </p>
            </>
          )}
          <input
            type="file"
            id="banner-upload"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={(e) =>
              setFieldValue("banner", e.target.files?.[0] || null)
            }
          />
        </label>
      )}

      {selectedMedia === "Video" && (
        <label className={styles.uploadVideo} htmlFor="video-upload">
          <UploadVideo className={styles.uploadIcon} />
          <p>
            <span className={styles.greenText}>Upload</span> or drag and drop
            video
            <br />
            MP4, MOV (max 10MB)
          </p>
          <input
            type="file"
            id="video-upload"
            accept="video/*"
            className={styles.hiddenInput}
            onChange={(e) =>
              setFieldValue("video", e.target.files?.[0] || null)
            }
          />
        </label>
      )}

      {selectedMedia === "Text" && (
        <input
          type="url"
          placeholder="Add link here"
          className={styles.linkInput}
          value={values.link}
          onChange={(e) => setFieldValue("link", e.target.value)}
        />
      )}

      <label htmlFor="" className={styles.linkLabel}>
        <p>Link</p>
        <input
          type="text"
          className={styles.linkInput}
          placeholder="Add link here"
          value={values.link}
          onChange={(e) => setFieldValue("link", e.target.value)}
        />
      </label>
    </div>
  );
}
