import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export function Testimonial({ quote, author, role, company }: TestimonialProps) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6 space-y-4">
        <Quote className="h-8 w-8 text-primary/30" />
        <blockquote className="text-foreground leading-relaxed">
          "{quote}"
        </blockquote>
        <div className="pt-2">
          <div className="font-semibold text-sm">{author}</div>
          <div className="text-sm text-muted-foreground">
            {role}, {company}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
