import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
  description?: string;
}

interface StepsProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function Steps({ steps, currentStep, onStepClick }: StepsProps) {
  return (
    <nav aria-label="Progress" className="space-y-4">
      <ol className="space-y-2">
        {steps.map((step, index) => {
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = onStepClick && index <= currentStep;

          return (
            <li key={index}>
              <button
                type="button"
                onClick={() => isClickable && onStepClick?.(index)}
                disabled={!isClickable}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                  isComplete && "bg-primary/10",
                  isCurrent && "bg-primary/20",
                  !isComplete && !isCurrent && "opacity-50",
                  isClickable && "hover:bg-primary/15 cursor-pointer",
                  !isClickable && "cursor-default"
                )}
                aria-current={isCurrent ? "step" : undefined}
                data-testid={`step-${index}`}
              >
                <span
                  className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    isComplete && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary text-primary-foreground",
                    !isComplete && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                >
                  {isComplete ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span className="flex flex-col min-w-0">
                  <span className={cn(
                    "text-sm font-medium truncate",
                    (isComplete || isCurrent) ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.label}
                  </span>
                  {step.description && (
                    <span className="text-xs text-muted-foreground truncate">
                      {step.description}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
