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
import { ArrowRight, Rocket } from "lucide-react";

export default function Home() {
  const featuredServices = services.slice(0, 6);

  return (
    <main id="main-content">
      <SEO {...seoConfig.home} />
      <Hero />
      <KPIBand />

      <section className="py-20 md:py-32" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <h2 id="services-heading" className="text-3xl md:text-4xl font-semibold tracking-tight" data-testid="text-section-services">
              Our Services
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
              <Button variant="outline" size="lg" className="gap-2" data-testid="button-view-all-services">
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-card border-y border-border py-16" aria-labelledby="partners-heading">
        <div className="max-w-7xl mx-auto px-6">
          <h2 id="partners-heading" className="sr-only">Technology Partners</h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="text-lg font-semibold text-muted-foreground/60"
                data-testid={`text-partner-${partner.name.toLowerCase()}`}
              >
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-semibold tracking-tight" data-testid="text-section-testimonials">
              What Our Clients Say
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

      <section className="bg-gradient-to-b from-primary/5 to-primary/10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight" data-testid="text-section-cta">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg text-muted-foreground">
            Let's turn your vision into a market-ready solution with clear scope, timeline, and outcomes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/scope">
              <Button size="lg" className="gap-2 text-base px-8" data-testid="button-cta-scope">
                <Rocket className="h-4 w-4" />
                {site.hero.primaryCta.text}
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="text-base px-8" data-testid="button-cta-contact">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
