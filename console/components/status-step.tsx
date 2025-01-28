interface StatusStepProps {
  step: number;
  currentStep: number;
  title: string;
  description: string;
}

export function StatusStep({
  step,
  currentStep,
  title,
  description,
}: StatusStepProps) {
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;

  return (
    <div
      className={`flex items-start ${isActive ? "opacity-100" : "opacity-50"}`}
    >
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 ${
          isCompleted
            ? "bg-green-500"
            : isActive
            ? "bg-blue-500"
            : "bg-gray-500"
        }`}
      >
        {isCompleted ? (
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <span className="text-white font-medium">{step}</span>
        )}
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-800">{description}</p>
      </div>
    </div>
  );
}
