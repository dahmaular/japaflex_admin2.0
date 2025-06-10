export default function PreviewComponent({
  handleNext,
}: {
  handleNext: () => void;
}) {
  return (
    <div className="demographic-component">
      <h2>Preview Component</h2>
      <p>This component will handle preview functionalities.</p>
      <button onClick={handleNext}>Next</button>
      {/* Add your demographic-related content here */}
    </div>
  );
}
