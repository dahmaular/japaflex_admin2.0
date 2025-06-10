export default function DurationComponent({
  handleNext,
}: {
  handleNext: () => void;
}) {
  return (
    <div className="demographic-component">
      <h2>Duration Component</h2>
      <p>This component will handle duration functionalities.</p>
      {/* Add your demographic-related content here */}
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
