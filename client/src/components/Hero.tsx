import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-background via-background to-card overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            data-testid="text-hero-title"
          >
            {site.hero.title}
          </h1>
          <p 
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            data-testid="text-hero-subtitle"
          >
            {site.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href={site.hero.primaryCta.href}>
              <Button size="lg" className="gap-2 text-base px-8" data-testid="button-hero-primary">
                {site.hero.primaryCta.text}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={site.hero.secondaryCta.href}>
              <Button variant="outline" size="lg" className="text-base px-8" data-testid="button-hero-secondary">
                {site.hero.secondaryCta.text}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
