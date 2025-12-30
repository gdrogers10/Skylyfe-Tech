import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { site } from "@/content/site";
import { programs } from "@/content/programs";
import { CheckCircle, Award, Users, Lightbulb, Heart } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation with Purpose",
    description: "We leverage emerging technologies not for their own sake, but to solve real problems and create lasting impact.",
  },
  {
    icon: Users,
    title: "Community-Centered Design",
    description: "Every solution we build considers the communities it will serve, ensuring accessibility and inclusivity.",
  },
  {
    icon: Award,
    title: "Veteran-Led Excellence",
    description: "Our leadership brings military precision, discipline, and commitment to every engagement.",
  },
  {
    icon: Heart,
    title: "Transparent Partnerships",
    description: "Clear communication, honest timelines, and no hidden surprises—just straightforward collaboration.",
  },
];

export default function About() {
  const eett = programs.eett;

  return (
    <main id="main-content">
      <PageHeader
        title="About Skylyfe Tech"
        subtitle="The innovation arm of Skylyfe Inc, translating community mission into real products and outcomes"
      />

      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight" data-testid="text-about-mission">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {site.about.mission}
            </p>
          </div>

          <div className="space-y-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center" data-testid="text-about-values">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="h-full">
                  <CardContent className="pt-6 space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="text-sm">Featured Program</Badge>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight" data-testid="text-about-eett">
                {eett.name}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {eett.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <h3 className="text-xl font-semibold">Program Highlights</h3>
                  <ul className="space-y-3">
                    {eett.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-6">
                  <h3 className="text-xl font-semibold">8-Week Timeline</h3>
                  <div className="space-y-4">
                    {eett.timeline.map((phase, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-24">
                          <Badge variant="outline" className="text-xs">
                            {phase.week}
                          </Badge>
                        </div>
                        <div>
                          <div className="font-medium">{phase.focus}</div>
                          <div className="text-sm text-muted-foreground">
                            {phase.topics.join(" • ")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">Relationship with Skylyfe Inc</h2>
            <p className="text-muted-foreground leading-relaxed">
              Skylyfe Technologies LLC operates as the innovation and technology services arm of Skylyfe Inc.
              While Skylyfe Inc focuses on community building and social impact programs, Skylyfe Tech
              translates that mission into market-ready technology solutions. We bring the same community-centered
              values to every client engagement, ensuring that technology serves people—not the other way around.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Badge>Veteran-Led</Badge>
              <Badge>Community-Focused</Badge>
              <Badge>Innovation-Driven</Badge>
              <Badge>Impact-Oriented</Badge>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
