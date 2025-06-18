// Types for Ads Management multi-step form

export type AdvertType = 'single-image' | 'carousel' | 'banner' | 'video' | 'text';

export interface AdvertDetailsForm {
  advertType: AdvertType;
  title: string;
  description: string;
  image: File | null;
  link: string;
}

// Canonical AdFormValues for all steps (matches formikTypes.ts)
export interface AdFormValues {
  mediaType: string;
  title: string;
  link: string;
  cta: string;
  upload: File | null;
  carousel: File[];
  banner: File | null;
  video: File | null;
  gender: string;
  interest: string[];
  ageRange: string[];
  days: string;
  budget: string;
}
