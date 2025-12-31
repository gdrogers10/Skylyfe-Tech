import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Steps } from "@/components/Steps";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { isUnauthorizedError } from "@/lib/auth-utils";
import { services } from "@/content/services";
import { sowFormSchema, type SowFormData, type SowOutput } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, ArrowRight, FileText, Download, Loader2, LogIn, Mail, Check } from "lucide-react";

const stepLabels = [
  { label: "Contact", description: "Your information" },
  { label: "Project Basics", description: "What you're building" },
  { label: "Timeline & Budget", description: "When and how much" },
  { label: "Tech Context", description: "Tools & integrations" },
  { label: "Deliverables", description: "What you'll receive" },
  { label: "Success Metrics", description: "How we measure success" },
  { label: "Legal/Compliance", description: "IP & data handling" },
  { label: "Review & Generate", description: "Finalize your SOW" },
];

const toolOptions = ["AI/ML", "AR/VR", "3D Printing", "IoT/GPS", "Shopify/E-commerce", "Custom Development"];
const metricOptions = [
  "Prototype delivered and functional",
  "AR experience live and accessible",
  "GPS dashboard operational",
  "Storefront launched and transacting",
  "Training completed with certification",
  "Analytics dashboard deployed",
];

const deliverablesByService: Record<string, string[]> = {
  "ai-ml-genai": ["AI strategy document", "Custom ML model", "API integrations", "Training documentation"],
  "spatial-ar": ["AR experience design", "WebAR deployment", "3D asset library", "Analytics dashboard"],
  "3d-printing-prototyping": ["3D model design", "Printed prototypes", "Technical specs", "CAD files"],
  "iot-gps-tracking": ["IoT hardware setup", "Cloud dashboard", "Mobile app", "API documentation"],
  "ecommerce-shopify": ["Shopify theme", "Product catalog", "Payment setup", "POD integration"],
  "branding-visual-identity": ["Logo design", "Color palette", "Brand guidelines", "Marketing templates"],
  "training-workshops": ["Custom curriculum", "Workshop sessions", "Lab exercises", "Reference materials"],
};

export default function Scope() {
  const [location] = useLocation();
  const { toast } = useToast();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedSow, setGeneratedSow] = useState<SowOutput | null>(null);
  const [sowHtml, setSowHtml] = useState<string>("");

  const searchParams = new URLSearchParams(location.split("?")[1] || "");
  const preselectedService = searchParams.get("service");

  const form = useForm<SowFormData>({
    resolver: zodResolver(sowFormSchema),
    defaultValues: {
      contact: { name: "", email: "", organization: "", role: "", phone: "" },
      projectBasics: {
        serviceTypes: preselectedService ? [preselectedService] : [],
        projectTitle: "",
        goals: "",
        audience: "",
        desiredOutcomes: "",
      },
      timeline: { duration: "4 weeks", budgetBand: "$5-15k" },
      techContext: { toolsOfInterest: [], integrations: "", dataSecurityNeeds: "" },
      deliverables: { suggested: [], custom: [] },
      successMetrics: { predefined: [], custom: "" },
      legal: { ipOwnership: "client", confidentiality: true, accessibility: true, dataSecurity: "" },
    },
  });

  const selectedServices = form.watch("projectBasics.serviceTypes");

  useEffect(() => {
    const suggested: string[] = [];
    selectedServices.forEach((slug) => {
      const serviceDeliverables = deliverablesByService[slug] || [];
      serviceDeliverables.forEach((d) => {
        if (!suggested.includes(d)) suggested.push(d);
      });
    });
    form.setValue("deliverables.suggested", suggested);
  }, [selectedServices, form]);

  const generateMutation = useMutation({
    mutationFn: async (data: SowFormData) => {
      const response = await apiRequest("POST", "/api/sow", data);
      return response.json();
    },
    onSuccess: (data: { sow: SowOutput; html: string }) => {
      setGeneratedSow(data.sow);
      setSowHtml(data.html);
      toast({ title: "SOW Generated!", description: "Your Statement of Work is ready." });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({ title: "Please log in", description: "You need to be logged in to generate a SOW.", variant: "destructive" });
        setTimeout(() => { window.location.href = "/api/login"; }, 500);
        return;
      }
      toast({ title: "Generation failed", description: "Please try again.", variant: "destructive" });
    },
  });

  const [emailSent, setEmailSent] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const downloadPdf = async () => {
    try {
      const response = await fetch("/api/sow/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: sowHtml }),
      });
      if (!response.ok) throw new Error("PDF generation failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `SOW-${generatedSow?.projectTitle || "Project"}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast({ title: "PDF Downloaded", description: "Your SOW has been downloaded." });
    } catch {
      toast({ title: "Download failed", description: "Please try again.", variant: "destructive" });
    }
  };

  const sendEmail = async () => {
    setSendingEmail(true);
    try {
      const formData = form.getValues();
      const response = await fetch("/api/sow/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          html: sowHtml,
          clientName: formData.contact.name,
          clientEmail: formData.contact.email,
          projectName: generatedSow?.projectTitle || formData.projectBasics.projectTitle,
        }),
      });
      if (!response.ok) throw new Error("Email send failed");
      setEmailSent(true);
      toast({ title: "Email Sent!", description: "The SOW has been sent to Skylyfe Technologies." });
    } catch {
      toast({ title: "Email failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setSendingEmail(false);
    }
  };

  const nextStep = () => {
    if (currentStep < stepLabels.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: SowFormData) => {
    generateMutation.mutate(data);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight" data-testid="text-step-title">Contact Information</h2>
              <p className="text-muted-foreground mt-2">Tell us about yourself so we can personalize your SOW.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="contact.name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl><Input placeholder="John Smith" {...field} data-testid="input-contact-name" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="contact.email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl><Input type="email" placeholder="john@company.com" {...field} data-testid="input-contact-email" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="contact.organization" render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization</FormLabel>
                  <FormControl><Input placeholder="Company Inc." {...field} data-testid="input-contact-org" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="contact.role" render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl><Input placeholder="Product Manager" {...field} data-testid="input-contact-role" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="contact.phone" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Phone</FormLabel>
                  <FormControl><Input type="tel" placeholder="(555) 123-4567" {...field} data-testid="input-contact-phone" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Project Basics</h2>
              <p className="text-muted-foreground mt-2">What are you looking to build?</p>
            </div>
            <FormField control={form.control} name="projectBasics.serviceTypes" render={({ field }) => (
              <FormItem>
                <FormLabel>Service Types *</FormLabel>
                <FormDescription>Select all that apply</FormDescription>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <label
                      key={service.slug}
                      className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                        field.value.includes(service.slug) ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Checkbox
                        checked={field.value.includes(service.slug)}
                        onCheckedChange={(checked) => {
                          const updated = checked
                            ? [...field.value, service.slug]
                            : field.value.filter((s) => s !== service.slug);
                          field.onChange(updated);
                        }}
                        data-testid={`checkbox-service-${service.slug}`}
                      />
                      <div>
                        <div className="font-medium text-sm">{service.title}</div>
                        <div className="text-xs text-muted-foreground">{service.subtitle}</div>
                      </div>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="projectBasics.projectTitle" render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title *</FormLabel>
                <FormControl><Input placeholder="E.g., AI-Powered Customer Service Bot" {...field} data-testid="input-project-title" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="projectBasics.goals" render={({ field }) => (
              <FormItem>
                <FormLabel>Project Goals *</FormLabel>
                <FormControl><Textarea placeholder="Describe what you're trying to achieve..." className="min-h-24 resize-none" {...field} data-testid="input-project-goals" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="projectBasics.audience" render={({ field }) => (
              <FormItem>
                <FormLabel>Target Audience</FormLabel>
                <FormControl><Input placeholder="Who will use this solution?" {...field} data-testid="input-project-audience" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="projectBasics.desiredOutcomes" render={({ field }) => (
              <FormItem>
                <FormLabel>Desired Outcomes</FormLabel>
                <FormControl><Textarea placeholder="What does success look like?" className="min-h-24 resize-none" {...field} data-testid="input-project-outcomes" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Timeline & Budget</h2>
              <p className="text-muted-foreground mt-2">Help us understand your constraints.</p>
            </div>
            <FormField control={form.control} name="timeline.duration" render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Timeline</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-timeline">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="2 weeks">2 weeks (Rapid prototype)</SelectItem>
                    <SelectItem value="4 weeks">4 weeks (Standard)</SelectItem>
                    <SelectItem value="8 weeks">8 weeks (Comprehensive)</SelectItem>
                    <SelectItem value="12 weeks">12 weeks (Enterprise)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="timeline.budgetBand" render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Range</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                    {["<$5k", "$5-15k", "$15-40k", "$40k+"].map((budget) => (
                      <label
                        key={budget}
                        className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors ${
                          field.value === budget ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value={budget} className="sr-only" />
                        <span className="font-medium">{budget}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Technical Context</h2>
              <p className="text-muted-foreground mt-2">What technologies and integrations are relevant?</p>
            </div>
            <FormField control={form.control} name="techContext.toolsOfInterest" render={({ field }) => (
              <FormItem>
                <FormLabel>Tools of Interest</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {toolOptions.map((tool) => (
                    <Badge
                      key={tool}
                      variant={field.value.includes(tool) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        const updated = field.value.includes(tool)
                          ? field.value.filter((t) => t !== tool)
                          : [...field.value, tool];
                        field.onChange(updated);
                      }}
                      data-testid={`badge-tool-${tool.toLowerCase().replace(/[/\s]+/g, '-')}`}
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="techContext.integrations" render={({ field }) => (
              <FormItem>
                <FormLabel>Existing Integrations</FormLabel>
                <FormControl><Textarea placeholder="Any systems we need to integrate with? (CRM, ERP, APIs, etc.)" className="min-h-24 resize-none" {...field} data-testid="input-integrations" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="techContext.dataSecurityNeeds" render={({ field }) => (
              <FormItem>
                <FormLabel>Data & Security Requirements</FormLabel>
                <FormControl><Textarea placeholder="Any specific security, compliance, or data handling requirements?" className="min-h-24 resize-none" {...field} data-testid="input-security-needs" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Deliverables</h2>
              <p className="text-muted-foreground mt-2">What will you receive at project completion?</p>
            </div>
            <FormField control={form.control} name="deliverables.suggested" render={({ field }) => (
              <FormItem>
                <FormLabel>Suggested Deliverables</FormLabel>
                <FormDescription>Based on your selected services</FormDescription>
                <div className="space-y-2">
                  {field.value.length > 0 ? (
                    field.value.map((deliverable, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Checkbox checked disabled />
                        <span className="text-sm">{deliverable}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Select services in Step 2 to see suggested deliverables</p>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="deliverables.custom" render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Deliverables</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any additional deliverables you'd like? (Enter one per line)"
                    className="min-h-24 resize-none"
                    value={Array.isArray(field.value) ? field.value.join("\n") : ""}
                    onChange={(e) => field.onChange(e.target.value.split("\n").filter(Boolean))}
                    data-testid="input-custom-deliverables"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Success Metrics</h2>
              <p className="text-muted-foreground mt-2">How will we measure project success?</p>
            </div>
            <FormField control={form.control} name="successMetrics.predefined" render={({ field }) => (
              <FormItem>
                <FormLabel>Common Success Metrics</FormLabel>
                <div className="space-y-2">
                  {metricOptions.map((metric) => (
                    <label key={metric} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:border-primary/50">
                      <Checkbox
                        checked={field.value.includes(metric)}
                        onCheckedChange={(checked) => {
                          const updated = checked
                            ? [...field.value, metric]
                            : field.value.filter((m) => m !== metric);
                          field.onChange(updated);
                        }}
                        data-testid={`checkbox-metric-${metric.slice(0, 20).toLowerCase().replace(/\s+/g, '-')}`}
                      />
                      <span className="text-sm">{metric}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="successMetrics.custom" render={({ field }) => (
              <FormItem>
                <FormLabel>Custom Metrics</FormLabel>
                <FormControl><Textarea placeholder="Any additional success criteria specific to your project?" className="min-h-24 resize-none" {...field} data-testid="input-custom-metrics" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Legal & Compliance</h2>
              <p className="text-muted-foreground mt-2">IP ownership and compliance preferences.</p>
            </div>
            <FormField control={form.control} name="legal.ipOwnership" render={({ field }) => (
              <FormItem>
                <FormLabel>IP Ownership Preference</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2">
                    <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer ${field.value === "client" ? "border-primary bg-primary/5" : "border-border"}`}>
                      <RadioGroupItem value="client" className="mt-1" />
                      <div>
                        <div className="font-medium text-sm">Client Ownership</div>
                        <div className="text-xs text-muted-foreground">All custom work transfers to you upon final payment</div>
                      </div>
                    </label>
                    <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer ${field.value === "shared" ? "border-primary bg-primary/5" : "border-border"}`}>
                      <RadioGroupItem value="shared" className="mt-1" />
                      <div>
                        <div className="font-medium text-sm">Shared Ownership</div>
                        <div className="text-xs text-muted-foreground">Both parties retain rights to use and modify</div>
                      </div>
                    </label>
                    <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer ${field.value === "skylyfe" ? "border-primary bg-primary/5" : "border-border"}`}>
                      <RadioGroupItem value="skylyfe" className="mt-1" />
                      <div>
                        <div className="font-medium text-sm">Skylyfe Ownership</div>
                        <div className="text-xs text-muted-foreground">Skylyfe retains ownership with perpetual license to client</div>
                      </div>
                    </label>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="legal.confidentiality" render={({ field }) => (
              <FormItem className="flex items-center gap-3 p-4 rounded-lg border">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} data-testid="checkbox-confidentiality" /></FormControl>
                <div className="space-y-1">
                  <FormLabel className="cursor-pointer">Confidentiality Required</FormLabel>
                  <FormDescription>Both parties agree to maintain confidentiality of proprietary information</FormDescription>
                </div>
              </FormItem>
            )} />
            <FormField control={form.control} name="legal.accessibility" render={({ field }) => (
              <FormItem className="flex items-center gap-3 p-4 rounded-lg border">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} data-testid="checkbox-accessibility" /></FormControl>
                <div className="space-y-1">
                  <FormLabel className="cursor-pointer">WCAG Accessibility Compliance</FormLabel>
                  <FormDescription>Solution will meet WCAG 2.1 AA accessibility standards</FormDescription>
                </div>
              </FormItem>
            )} />
            <FormField control={form.control} name="legal.dataSecurity" render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Security Notes</FormLabel>
                <FormControl><Textarea placeholder="Any specific compliance requirements? (HIPAA, GDPR, SOC2, etc.)" className="min-h-24 resize-none" {...field} data-testid="input-legal-security" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        );

      case 7:
        const formValues = form.getValues();
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Review & Generate</h2>
              <p className="text-muted-foreground mt-2">Review your information and generate your SOW.</p>
            </div>

            {generatedSow ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-primary" />
                      <h3 className="text-lg font-semibold">Your Statement of Work</h3>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Button onClick={downloadPdf} className="gap-2" data-testid="button-download-pdf">
                        <Download className="h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button 
                        onClick={sendEmail} 
                        disabled={emailSent || sendingEmail}
                        variant={emailSent ? "secondary" : "default"}
                        className="gap-2" 
                        data-testid="button-send-email"
                      >
                        {sendingEmail ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : emailSent ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Mail className="h-4 w-4" />
                        )}
                        {emailSent ? "Email Sent" : sendingEmail ? "Sending..." : "Send to Skylyfe"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="prose prose-slate dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: sowHtml }}
                      data-testid="sow-preview"
                    />
                  </CardContent>
                </Card>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader><h3 className="font-semibold">Contact</h3></CardHeader>
                    <CardContent className="text-sm space-y-1">
                      <div><span className="text-muted-foreground">Name:</span> {formValues.contact.name}</div>
                      <div><span className="text-muted-foreground">Email:</span> {formValues.contact.email}</div>
                      {formValues.contact.organization && <div><span className="text-muted-foreground">Org:</span> {formValues.contact.organization}</div>}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><h3 className="font-semibold">Project</h3></CardHeader>
                    <CardContent className="text-sm space-y-1">
                      <div><span className="text-muted-foreground">Title:</span> {formValues.projectBasics.projectTitle}</div>
                      <div><span className="text-muted-foreground">Services:</span> {formValues.projectBasics.serviceTypes.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><h3 className="font-semibold">Timeline & Budget</h3></CardHeader>
                    <CardContent className="text-sm space-y-1">
                      <div><span className="text-muted-foreground">Duration:</span> {formValues.timeline.duration}</div>
                      <div><span className="text-muted-foreground">Budget:</span> {formValues.timeline.budgetBand}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><h3 className="font-semibold">Deliverables</h3></CardHeader>
                    <CardContent className="text-sm">
                      <div>{formValues.deliverables.suggested.length + formValues.deliverables.custom.length} items</div>
                    </CardContent>
                  </Card>
                </div>

                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  size="lg"
                  className="w-full gap-2"
                  disabled={generateMutation.isPending}
                  data-testid="button-generate-sow"
                >
                  {generateMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating SOW...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />
                      Generate Statement of Work
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (authLoading) {
    return (
      <main id="main-content" className="bg-card min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main id="main-content" className="bg-card min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <FileText className="h-12 w-12 mx-auto text-primary mb-4" />
            <h1 className="text-2xl font-semibold" data-testid="text-login-required">Sign In Required</h1>
            <p className="text-muted-foreground mt-2">
              Please sign in to access the SOW generator and create your custom Statement of Work.
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Creating an account takes less than a minute and gives you access to:
            </p>
            <ul className="text-sm text-left space-y-2 ml-4">
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                AI-powered SOW generation
              </li>
              <li className="flex items-center gap-2">
                <Download className="h-4 w-4 text-primary" />
                PDF export for your proposals
              </li>
            </ul>
            <Button
              onClick={() => { window.location.href = "/api/login"; }}
              className="w-full gap-2"
              size="lg"
              data-testid="button-login"
            >
              <LogIn className="h-4 w-4" />
              Sign In to Continue
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main id="main-content" className="bg-card min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 lg:sticky lg:top-24 lg:self-start">
            <Card>
              <CardHeader>
                <h1 className="text-xl font-semibold" data-testid="text-scope-title">Launch Your Project</h1>
                <p className="text-sm text-muted-foreground">Generate a detailed Statement of Work</p>
              </CardHeader>
              <CardContent>
                <Steps steps={stepLabels} currentStep={currentStep} onStepClick={setCurrentStep} />
              </CardContent>
            </Card>
          </aside>

          <div className="flex-1 min-w-0">
            <Card>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form className="space-y-8">
                    {renderStepContent()}

                    <div className="flex items-center justify-between gap-4 pt-6 border-t">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="gap-2"
                        data-testid="button-prev-step"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </Button>
                      {currentStep < stepLabels.length - 1 && (
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="gap-2"
                          data-testid="button-next-step"
                        >
                          Continue
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
