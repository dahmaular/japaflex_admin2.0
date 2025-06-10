export default function DemographicComponent({
  handleNext,
}: {
  handleNext: () => void;
}) {
  return (
    <div className="demographic-component">
      <h2>Demographic Component</h2>
      <p>This component will handle demographic-related functionalities.</p>
      {/* Add your demographic-related content here */}
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
