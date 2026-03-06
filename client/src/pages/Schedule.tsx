import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEO } from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { scheduleFormSchema, type ScheduleFormData } from "@shared/schema";
import { CalendarDays, Clock, CheckCircle, Sparkles, Zap, Mail } from "lucide-react";

const serviceOptions = [
  "AI/ML & GenAI",
  "Spatial/AR Experiences",
  "3D Printing & Rapid Prototyping",
  "IoT & GPS Tracking",
  "E-commerce & Shopify",
  "Branding & Visual Identity",
  "Training & Workshops",
  "General Consultation",
];

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
];

function getMinDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

export default function Schedule() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      name: "",
      email: "",
      date: "",
      time: "",
      service: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ScheduleFormData) => {
      return apiRequest("POST", "/api/schedule", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Meeting scheduled!",
        description: "You'll receive a calendar invite shortly.",
      });
    },
    onError: () => {
      toast({
        title: "Scheduling failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ScheduleFormData) => {
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <main id="main-content">
        <SEO
          title="Schedule a Meeting | Skylyfe Tech"
          description="Book a consultation with Skylyfe Technologies to discuss your next project."
        />
        <PageHeader title="Schedule a Meeting" />
        <section className="py-20 md:py-32">
          <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
            <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto animate-pulse">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-semibold" data-testid="text-schedule-success">
              Meeting Scheduled!
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your meeting has been added to our calendar. You'll receive a confirmation at the email you provided. We look forward to speaking with you!
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                form.reset();
              }}
              variant="outline"
              className="gap-2 border-primary/30 hover:border-primary/60"
              data-testid="button-schedule-another"
            >
              <CalendarDays className="h-4 w-4" />
              Schedule Another Meeting
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main id="main-content">
      <SEO
        title="Schedule a Meeting | Skylyfe Tech"
        description="Book a consultation with Skylyfe Technologies to discuss your next project."
      />
      <PageHeader title="Schedule a Meeting" subtitle="Book a free consultation to discuss your project goals and how we can help bring your vision to life." />

      <section className="py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="glass-light dark:glass border-primary/10">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
                      <CalendarDays className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Book Your Consultation</h2>
                      <p className="text-sm text-muted-foreground">30-minute meeting</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} data-testid="input-schedule-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="you@example.com" {...field} data-testid="input-schedule-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service of Interest</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-schedule-service">
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {serviceOptions.map((service) => (
                                  <SelectItem key={service} value={service} data-testid={`option-service-${service.toLowerCase().replace(/[^a-z]/g, '-')}`}>
                                    {service}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preferred Date</FormLabel>
                              <FormControl>
                                <Input type="date" min={getMinDate()} {...field} data-testid="input-schedule-date" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preferred Time (EST)</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-schedule-time">
                                    <SelectValue placeholder="Select a time" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {timeSlots.map((slot) => (
                                    <SelectItem key={slot} value={slot} data-testid={`option-time-${slot.replace(/[: ]/g, '-').toLowerCase()}`}>
                                      {slot}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us briefly about your project or what you'd like to discuss..."
                                className="min-h-[100px] resize-none"
                                {...field}
                                data-testid="textarea-schedule-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full gap-2 gradient-primary hover:opacity-90 transition-all duration-300 hover-glow border-0"
                        size="lg"
                        disabled={mutation.isPending}
                        data-testid="button-schedule-submit"
                      >
                        {mutation.isPending ? (
                          <>
                            <Clock className="h-4 w-4 animate-spin" />
                            Scheduling...
                          </>
                        ) : (
                          <>
                            <CalendarDays className="h-4 w-4" />
                            Schedule Meeting
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glass-light dark:glass border-primary/10">
                <CardContent className="pt-6 space-y-4">
                  <h3 className="font-semibold text-lg">What to Expect</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Free Consultation</p>
                        <p className="text-xs text-muted-foreground">30-minute discovery call at no cost</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Zap className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Expert Guidance</p>
                        <p className="text-xs text-muted-foreground">Discuss your goals with our tech team</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Calendar Invite</p>
                        <p className="text-xs text-muted-foreground">Confirmation sent to your email</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-light dark:glass border-secondary/10 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    Need to discuss something urgently? Reach us directly at{" "}
                    <a href="mailto:info@skylyfe.tech" className="text-primary hover:underline" data-testid="link-schedule-email">
                      info@skylyfe.tech
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
