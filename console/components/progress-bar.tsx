interface ProgressBarProps {
  steps: number
  currentStep: number
}

export function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="relative">
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
        <div
          style={{ width: `${(currentStep / steps) * 100}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
        ></div>
      </div>
      <div className="flex justify-between">
        {Array.from({ length: steps }, (_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full ${
              i + 1 <= currentStep ? "bg-blue-500" : "bg-gray-200"
            } flex items-center justify-center text-xs font-semibold text-white`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}

