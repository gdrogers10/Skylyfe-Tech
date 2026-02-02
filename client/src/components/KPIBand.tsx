import { kpis } from "@/content/impact";
import { TrendingUp } from "lucide-react";

export function KPIBand() {
  return (
    <section className="relative bg-gradient-to-r from-primary/5 via-card to-secondary/5 border-y border-primary/10 py-12 md:py-16 overflow-hidden">
      {/* Subtle cyber grid in background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Glowing accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {kpis.map((kpi, index) => (
            <div 
              key={index} 
              className="text-center space-y-2 group"
              data-testid={`kpi-${index}`}
            >
              <div 
                className="text-4xl md:text-5xl font-bold gradient-text transition-all duration-300" 
                data-testid={`text-kpi-value-${index}`}
              >
                {kpi.value}
              </div>
              {kpi.change && (
                <div 
                  className="inline-flex items-center gap-1 text-sm font-medium text-emerald-500 dark:text-emerald-400" 
                  data-testid={`text-kpi-change-${index}`}
                >
                  <TrendingUp className="w-3 h-3" />
                  {kpi.change}
                </div>
              )}
              <div 
                className="text-sm font-semibold text-foreground" 
                data-testid={`text-kpi-label-${index}`}
              >
                {kpi.label}
              </div>
              {kpi.context && (
                <div 
                  className="text-xs text-muted-foreground" 
                  data-testid={`text-kpi-context-${index}`}
                >
                  {kpi.context}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Glowing accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
    </section>
  );
}
