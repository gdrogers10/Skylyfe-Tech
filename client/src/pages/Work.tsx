import { PageHeader } from "@/components/PageHeader";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { SEO } from "@/components/SEO";
import { caseStudies } from "@/content/impact";
import { seoConfig } from "@/lib/seo";

export default function Work() {
  return (
    <main id="main-content">
      <SEO {...seoConfig.work} />
      <PageHeader
        title="Our Work"
        subtitle="Real outcomes from real partnerships—no PII, just results"
      />

      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.id} {...study} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
