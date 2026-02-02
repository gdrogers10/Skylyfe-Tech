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
    <Card 
      className="group h-full flex flex-col relative overflow-visible transition-all duration-300 hover:shadow-[0_0_30px_hsla(187,100%,50%,0.15)] dark:hover:shadow-[0_0_40px_hsla(187,100%,50%,0.25)] border-border/50 hover:border-primary/30" 
      data-testid={`card-service-${service.slug}`}
    >
      {/* Subtle glow effect on hover */}
      <div className="absolute -inset-px rounded-lg bg-gradient-to-br from-primary/0 via-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:via-transparent group-hover:to-secondary/10 transition-all duration-500 pointer-events-none" />
      
      {service.image && (
        <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
          <img
            src={service.image}
            alt={service.imageAlt || service.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          {/* Scan line effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent h-1/3 animate-[scan-line_2s_linear_infinite]" />
          </div>
        </div>
      )}
      
      <CardHeader className="space-y-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300 group-hover:shadow-[0_0_20px_hsla(187,100%,50%,0.3)]">
            <Icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors duration-300" data-testid={`text-service-title-${service.slug}`}>
            {service.title}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {service.subtitle}
        </p>
      </CardHeader>
      
      <CardContent className="flex-1 relative z-10">
        <div className="flex flex-wrap gap-2">
          {service.tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="relative z-10">
        <Link 
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          data-testid={`link-service-${service.slug}`}
        >
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
        </Link>
      </CardFooter>
    </Card>
  );
}
