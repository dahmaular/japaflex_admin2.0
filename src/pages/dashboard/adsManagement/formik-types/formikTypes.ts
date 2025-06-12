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
