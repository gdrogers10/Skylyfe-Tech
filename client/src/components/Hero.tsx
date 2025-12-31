import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { Rocket } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/hero-team.jpg"
          alt="African American professionals collaborating on technology solutions in a meeting"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40">
        <div className="max-w-2xl space-y-8">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            data-testid="text-hero-title"
          >
            {site.hero.title}
          </h1>
          <p 
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            data-testid="text-hero-subtitle"
          >
            {site.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
            <Link href={site.hero.primaryCta.href}>
              <Button size="lg" className="gap-2 text-base px-8" data-testid="button-hero-primary">
                <Rocket className="h-4 w-4" />
                {site.hero.primaryCta.text}
              </Button>
            </Link>
            <Link href={site.hero.secondaryCta.href}>
              <Button variant="outline" size="lg" className="text-base px-8" data-testid="button-hero-secondary">
                {site.hero.secondaryCta.text}
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground pt-2" data-testid="text-sow-hint">
            Use our AI-powered SOW Generator to create a professional project scope in minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
