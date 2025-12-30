import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { site } from "@/content/site";

export default function Legal() {
  return (
    <main id="main-content">
      <PageHeader
        title="Legal"
        subtitle="Terms of Service and Privacy Policy"
      />

      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <Tabs defaultValue="terms" className="space-y-8">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="terms" data-testid="tab-terms">Terms of Service</TabsTrigger>
              <TabsTrigger value="privacy" data-testid="tab-privacy">Privacy Policy</TabsTrigger>
            </TabsList>

            <TabsContent value="terms" id="terms">
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-semibold" data-testid="text-terms-title">Terms of Service</h2>
                  <p className="text-sm text-muted-foreground">Last updated: January 2025</p>
                </CardHeader>
                <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                  <h3>1. Acceptance of Terms</h3>
                  <p>
                    By accessing and using the services provided by {site.fullName} ("Company," "we," "our," or "us"),
                    you accept and agree to be bound by the terms and provision of this agreement.
                  </p>

                  <h3>2. Services</h3>
                  <p>
                    {site.fullName} provides emerging technology services including but not limited to:
                    AI/ML & GenAI development, Spatial/AR experiences, 3D printing & rapid prototyping,
                    IoT & GPS tracking solutions, e-commerce enablement, branding, and training workshops.
                  </p>

                  <h3>3. Statement of Work</h3>
                  <p>
                    All project engagements are governed by a Statement of Work (SOW) that outlines:
                    project scope, deliverables, timeline, pricing, and terms specific to that engagement.
                    The SOW, once agreed upon, becomes a binding agreement between the parties.
                  </p>

                  <h3>4. Payment Terms</h3>
                  <p>
                    Payment terms are specified in each SOW. Standard terms include:
                  </p>
                  <ul>
                    <li>Fixed-scope projects: 50% upfront, 50% upon completion</li>
                    <li>Time & Materials: Invoiced monthly in arrears</li>
                    <li>Milestone-based: As specified in the SOW</li>
                  </ul>

                  <h3>5. Intellectual Property</h3>
                  <p>
                    Unless otherwise specified in the SOW:
                  </p>
                  <ul>
                    <li>Custom work created for the client transfers to the client upon final payment</li>
                    <li>Pre-existing frameworks and tools remain the property of {site.fullName}</li>
                    <li>Open-source components are subject to their respective licenses</li>
                  </ul>

                  <h3>6. Confidentiality</h3>
                  <p>
                    Both parties agree to maintain the confidentiality of proprietary information
                    shared during the engagement. Specific confidentiality terms may be established
                    through a separate NDA.
                  </p>

                  <h3>7. Limitation of Liability</h3>
                  <p>
                    {site.fullName}'s liability is limited to the total fees paid for the specific
                    project engagement. We are not liable for indirect, incidental, or consequential damages.
                  </p>

                  <h3>8. Termination</h3>
                  <p>
                    Either party may terminate an engagement with 30 days written notice.
                    Upon termination, the client is responsible for payment of work completed to date.
                  </p>

                  <h3>9. Contact</h3>
                  <p>
                    For questions about these terms, contact us at {site.email}.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" id="privacy">
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-semibold" data-testid="text-privacy-title">Privacy Policy</h2>
                  <p className="text-sm text-muted-foreground">Last updated: January 2025</p>
                </CardHeader>
                <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                  <h3>1. Information We Collect</h3>
                  <p>We collect information you provide directly to us, including:</p>
                  <ul>
                    <li>Contact information (name, email, phone, organization)</li>
                    <li>Project requirements and preferences</li>
                    <li>Communications with our team</li>
                  </ul>

                  <h3>2. How We Use Your Information</h3>
                  <p>We use the information we collect to:</p>
                  <ul>
                    <li>Provide, maintain, and improve our services</li>
                    <li>Communicate with you about projects and services</li>
                    <li>Generate Statements of Work and project documentation</li>
                    <li>Respond to your requests and inquiries</li>
                  </ul>

                  <h3>3. Data Security</h3>
                  <p>
                    We implement appropriate technical and organizational measures to protect
                    your personal information against unauthorized access, alteration, disclosure,
                    or destruction. This includes:
                  </p>
                  <ul>
                    <li>Encryption of data in transit and at rest</li>
                    <li>Access controls and authentication</li>
                    <li>Regular security assessments</li>
                  </ul>

                  <h3>4. Data Retention</h3>
                  <p>
                    We retain your information for as long as necessary to provide our services
                    and fulfill the purposes described in this policy. Project-related data is
                    retained for the duration of the engagement plus any legally required period.
                  </p>

                  <h3>5. Third-Party Services</h3>
                  <p>
                    We may use third-party services to support our operations. These services
                    are bound by their own privacy policies and we select partners who demonstrate
                    commitment to data protection.
                  </p>

                  <h3>6. Your Rights</h3>
                  <p>You have the right to:</p>
                  <ul>
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt out of marketing communications</li>
                  </ul>

                  <h3>7. GDPR & CCPA Compliance</h3>
                  <p>
                    We respect the privacy rights established by GDPR and CCPA.
                    For EU residents and California residents, additional rights may apply.
                    Contact us to exercise these rights.
                  </p>

                  <h3>8. Changes to This Policy</h3>
                  <p>
                    We may update this privacy policy from time to time.
                    We will notify you of any changes by posting the new policy on this page.
                  </p>

                  <h3>9. Contact Us</h3>
                  <p>
                    For questions about this privacy policy or your data, contact us at {site.email}.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
