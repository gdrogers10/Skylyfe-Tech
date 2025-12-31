import { useParams, Link, Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SEO } from "@/components/SEO";
import { getServiceBySlug } from "@/content/services";
import { getServiceSEO, getServiceStructuredData } from "@/lib/seo";
import { ArrowRight, CheckCircle, Clock, Wrench, Shield, DollarSign } from "lucide-react";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || "");

  if (!service) {
    return <Redirect to="/services" />;
  }

  const serviceSeo = getServiceSEO(service.slug, service.title, service.subtitle);
  const structuredData = getServiceStructuredData(service);

  return (
    <main id="main-content">
      <SEO {...serviceSeo} structuredData={structuredData} />
      <div className="bg-gradient-to-b from-background to-card border-b border-border py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-service-detail-title">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-service-detail-subtitle">
              {service.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href={`/scope?service=${service.slug}`}>
                <Button size="lg" className="gap-2" data-testid="button-scope-service">
                  {service.ctas.primaryText}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" data-testid="button-contact-service">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Who This Is For</h2>
                <p className="text-muted-foreground leading-relaxed">{service.who}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Pain Points We Solve</h2>
                <ul className="space-y-3">
                  {service.painPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center text-destructive text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Outcomes You Can Expect</h2>
                <ul className="space-y-3">
                  {service.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Deliverables</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.deliverables.map((deliverable, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
                            {index + 1}
                          </div>
                          <span className="text-sm">{deliverable}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="timeline">
                  <AccordionTrigger className="text-lg font-semibold" data-testid="accordion-timeline">
                    <span className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Timeline Options
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-3 pt-2">
                      {service.timelineOptions.map((timeline) => (
                        <Badge key={timeline} variant="outline" className="text-sm py-1 px-3">
                          {timeline}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                {service.complianceNotes && (
                  <AccordionItem value="compliance">
                    <AccordionTrigger className="text-lg font-semibold" data-testid="accordion-compliance">
                      <span className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Compliance & Security
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground pt-2">{service.complianceNotes}</p>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Pricing Models
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {service.pricingModels.map((model) => (
                    <div key={model} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{model}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    Tools & Technologies
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.tools.map((tool) => (
                      <Badge key={tool} variant="secondary" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6 space-y-4">
                  <h3 className="text-lg font-semibold">Ready to Get Started?</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate a detailed Statement of Work tailored to your project needs.
                  </p>
                  <Link href={`/scope?service=${service.slug}`}>
                    <Button className="w-full gap-2" data-testid="button-sidebar-scope">
                      {service.ctas.primaryText}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
