import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Glasses, Printer, MapPin, ShoppingCart, Palette, GraduationCap } from "lucide-react";
import type { Service } from "@/content/services";

const iconMap: Record<string, typeof Brain> = {
  Brain,
  Glasses,
  Printer,
  MapPin,
  ShoppingCart,
  Palette,
  GraduationCap,
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Brain;

  return (
    <Card className="group h-full flex flex-col hover-elevate transition-all duration-200" data-testid={`card-service-${service.slug}`}>
      <CardHeader className="space-y-4">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight" data-testid={`text-service-title-${service.slug}`}>
            {service.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {service.subtitle}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {service.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link 
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
          data-testid={`link-service-${service.slug}`}
        >
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
