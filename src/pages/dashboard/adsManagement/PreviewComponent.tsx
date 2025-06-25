import { AdFormValues } from "./formik-types/formikTypes";

interface PreviewComponentProps {
  values: AdFormValues;
}

export default function PreviewComponent({ values }: PreviewComponentProps) {
  return <div className="demographic-component"></div>;
}
