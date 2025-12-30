import { kpis } from "@/content/impact";

export function KPIBand() {
  return (
    <section className="bg-card border-y border-border py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {kpis.map((kpi, index) => (
            <div key={index} className="text-center space-y-2" data-testid={`kpi-${index}`}>
              <div className="text-3xl md:text-4xl font-bold text-primary" data-testid={`text-kpi-value-${index}`}>
                {kpi.value}
              </div>
              {kpi.change && (
                <div className="text-sm font-medium text-green-500 dark:text-green-400" data-testid={`text-kpi-change-${index}`}>
                  {kpi.change}
                </div>
              )}
              <div className="text-sm font-medium text-foreground" data-testid={`text-kpi-label-${index}`}>
                {kpi.label}
              </div>
              {kpi.context && (
                <div className="text-xs text-muted-foreground" data-testid={`text-kpi-context-${index}`}>
                  {kpi.context}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
