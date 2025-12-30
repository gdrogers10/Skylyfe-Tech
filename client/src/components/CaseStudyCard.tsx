import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface Metric {
  label: string;
  value: string;
}

interface CaseStudyCardProps {
  id: string;
  title: string;
  client: string;
  services: string[];
  challenge: string;
  solution: string;
  tools: string[];
  metrics: Metric[];
  outcomes: string[];
}

export function CaseStudyCard({
  id,
  title,
  client,
  services,
  challenge,
  solution,
  tools,
  metrics,
  outcomes,
}: CaseStudyCardProps) {
  return (
    <Card className="h-full" data-testid={`card-case-study-${id}`}>
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {services.map((service) => (
            <Badge key={service} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold tracking-tight" data-testid={`text-case-title-${id}`}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{client}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Challenge</h4>
          <p className="text-sm leading-relaxed">{challenge}</p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Solution</h4>
          <p className="text-sm leading-relaxed">{solution}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-bold text-primary">{metric.value}</div>
              <div className="text-xs text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Outcomes</h4>
          <ul className="space-y-2">
            {outcomes.map((outcome, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {tools.map((tool) => (
            <Badge key={tool} variant="outline" className="text-xs">
              {tool}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
