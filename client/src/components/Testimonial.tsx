import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export function Testimonial({ quote, author, role, company }: TestimonialProps) {
  return (
    <Card className="h-full group relative overflow-visible transition-all duration-300 hover:shadow-[0_0_30px_hsla(270,70%,60%,0.15)] dark:hover:shadow-[0_0_40px_hsla(270,70%,60%,0.25)] border-border/50 hover:border-secondary/30">
      {/* Gradient overlay on hover */}
      <div className="absolute -inset-px rounded-lg bg-gradient-to-br from-secondary/0 via-transparent to-primary/0 group-hover:from-secondary/10 group-hover:to-primary/10 transition-all duration-500 pointer-events-none" />
      
      <CardContent className="pt-6 space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <Quote className="h-10 w-10 text-secondary/40 group-hover:text-secondary/60 transition-colors duration-300" />
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-primary/80 text-primary/80" />
            ))}
          </div>
        </div>
        
        <blockquote className="text-foreground leading-relaxed italic">
          "{quote}"
        </blockquote>
        
        <div className="pt-2 border-t border-border/50">
          <div className="font-semibold text-sm gradient-text">{author}</div>
          <div className="text-sm text-muted-foreground">
            {role}, {company}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
