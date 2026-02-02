import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";
import { KPIBand } from "@/components/KPIBand";
import { ServiceCard } from "@/components/ServiceCard";
import { Testimonial } from "@/components/Testimonial";
import { SEO } from "@/components/SEO";
import { services } from "@/content/services";
import { partners, testimonials } from "@/content/partners";
import { site } from "@/content/site";
import { seoConfig } from "@/lib/seo";
import { ArrowRight, Rocket, Sparkles, Zap } from "lucide-react";

export default function Home() {
  const featuredServices = services.slice(0, 6);

  return (
    <main id="main-content">
      <SEO {...seoConfig.home} />
      <Hero />
      <KPIBand />

      {/* Services Section */}
      <section className="relative py-20 md:py-32 overflow-hidden" aria-labelledby="services-heading">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Zap className="w-4 h-4" />
              What We Do
            </div>
            <h2 id="services-heading" className="text-3xl md:text-4xl font-bold tracking-tight" data-testid="text-section-services">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              End-to-end emerging technology solutions tailored to your goals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="text-center pt-4">
            <Link href="/services">
              <Button variant="outline" size="lg" className="gap-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5" data-testid="button-view-all-services">
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="relative bg-gradient-to-r from-primary/5 via-card to-secondary/5 border-y border-primary/10 py-16 overflow-hidden" aria-labelledby="partners-heading">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <h2 id="partners-heading" className="sr-only">Technology Partners</h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="text-lg font-semibold text-muted-foreground/50 hover:text-primary/70 transition-colors duration-300"
                data-testid={`text-partner-${partner.name.toLowerCase()}`}
              >
                {partner.name}
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 md:py-32 overflow-hidden" aria-labelledby="testimonials-heading">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Success Stories
            </div>
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold tracking-tight" data-testid="text-section-testimonials">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real outcomes from real partnerships
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 animate-gradient" />
        <div className="absolute inset-0 cyber-grid opacity-30" />
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light dark:glass text-primary text-sm font-medium animate-pulse-glow">
            <Rocket className="w-4 h-4" />
            Ready to Launch?
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight" data-testid="text-section-cta">
            Ready to Build Something <span className="gradient-text">Amazing?</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's turn your vision into a market-ready solution with clear scope, timeline, and outcomes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/scope">
              <Button 
                size="lg" 
                className="gap-2 text-base px-8 gradient-primary hover:opacity-90 transition-all duration-300 hover-glow border-0"
                data-testid="button-cta-scope"
              >
                <Rocket className="h-4 w-4" />
                {site.hero.primaryCta.text}
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base px-8 border-primary/30 hover:border-primary/60 hover:bg-primary/5"
                data-testid="button-cta-contact"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
