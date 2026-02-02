import { Check, Rocket } from "lucide-react";
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
  const progress = ((currentStep) / (steps.length - 1)) * 100;
  
  return (
    <nav aria-label="Progress" className="space-y-4">
      {/* Progress bar */}
      <div className="relative h-2 bg-muted/50 rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full animate-pulse"
          style={{ width: `${progress}%` }}
        />
      </div>
      
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
                  "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-300",
                  isComplete && "bg-primary/10 hover:bg-primary/15",
                  isCurrent && "bg-gradient-to-r from-primary/20 to-secondary/10 shadow-[0_0_15px_hsla(187,100%,50%,0.15)]",
                  !isComplete && !isCurrent && "opacity-40 hover:opacity-50",
                  isClickable && "cursor-pointer",
                  !isClickable && "cursor-default"
                )}
                aria-current={isCurrent ? "step" : undefined}
                data-testid={`step-${index}`}
              >
                <span
                  className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                    isComplete && "bg-primary text-primary-foreground shadow-[0_0_10px_hsla(187,100%,50%,0.4)]",
                    isCurrent && "gradient-primary text-primary-foreground animate-pulse shadow-[0_0_15px_hsla(187,100%,50%,0.5)]",
                    !isComplete && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                >
                  {isComplete ? (
                    <Check className="h-4 w-4" />
                  ) : isCurrent ? (
                    <Rocket className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span className="flex flex-col min-w-0">
                  <span className={cn(
                    "text-sm font-medium truncate transition-colors duration-300",
                    isComplete && "text-primary",
                    isCurrent && "gradient-text font-semibold",
                    !isComplete && !isCurrent && "text-muted-foreground"
                  )}>
                    {step.label}
                  </span>
                  {step.description && (
                    <span className="text-xs text-muted-foreground truncate">
                      {step.description}
                    </span>
                  )}
                </span>
                
                {/* Status indicator */}
                {isCurrent && (
                  <span className="ml-auto text-xs text-primary font-medium animate-pulse">
                    In Progress
                  </span>
                )}
                {isComplete && (
                  <span className="ml-auto text-xs text-primary/70 font-medium">
                    Complete
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>
      
      {/* Launch status */}
      <div className="text-center pt-2">
        <p className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>
    </nav>
  );
}
