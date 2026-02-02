import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { Rocket, Sparkles, Zap, Globe, Cpu, Binary } from "lucide-react";

function FloatingElement({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      {children}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10 dark:to-primary/5" />
      
      {/* Cyber grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      
      {/* Floating tech elements */}
      <FloatingElement className="top-20 right-[15%] animate-float opacity-20 dark:opacity-30">
        <Cpu className="w-16 h-16 text-primary" />
      </FloatingElement>
      <FloatingElement className="top-40 right-[25%] animate-float-delayed opacity-15 dark:opacity-25">
        <Globe className="w-12 h-12 text-secondary" />
      </FloatingElement>
      <FloatingElement className="bottom-32 right-[20%] animate-float opacity-20 dark:opacity-30">
        <Binary className="w-10 h-10 text-primary" />
      </FloatingElement>
      <FloatingElement className="top-32 left-[60%] animate-float-delayed opacity-10 dark:opacity-20">
        <Zap className="w-8 h-8 text-secondary" />
      </FloatingElement>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Hero image with gradient overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-team.jpg"
          alt="African American professionals collaborating on technology solutions in a meeting"
          className="w-full h-full object-cover opacity-40 dark:opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40 w-full">
        <div className="max-w-2xl space-y-8">
          {/* Tagline badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light dark:glass text-sm font-medium text-primary animate-pulse-glow">
            <Sparkles className="w-4 h-4" />
            <span>From Vision to Market</span>
          </div>
          
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            data-testid="text-hero-title"
          >
            <span className="gradient-text">{site.hero.title.split(' ').slice(0, 2).join(' ')}</span>
            <br />
            <span>{site.hero.title.split(' ').slice(2).join(' ')}</span>
          </h1>
          
          <p 
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            data-testid="text-hero-subtitle"
          >
            {site.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
            <Link href={site.hero.primaryCta.href}>
              <Button 
                size="lg" 
                className="gap-2 text-base px-8 gradient-primary hover:opacity-90 transition-all duration-300 hover-glow border-0"
                data-testid="button-hero-primary"
              >
                <Rocket className="h-4 w-4" />
                {site.hero.primaryCta.text}
              </Button>
            </Link>
            <Link href={site.hero.secondaryCta.href}>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base px-8 border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
                data-testid="button-hero-secondary"
              >
                {site.hero.secondaryCta.text}
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground pt-2 flex items-center gap-2" data-testid="text-sow-hint">
            <Zap className="w-4 h-4 text-primary" />
            Use our AI-powered SOW Generator to create a professional project scope in minutes.
          </p>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
