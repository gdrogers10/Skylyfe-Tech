import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, FileText, Trash2, Download, Eye, Rocket, 
  Calendar, Building, Mail, Loader2, ArrowLeft, Sparkles 
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import type { SavedSow, SowOutput } from "@shared/schema";

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Profile() {
  const [, setLocation] = useLocation();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const { data: savedSows, isLoading: sowsLoading } = useQuery<SavedSow[]>({
    queryKey: ["/api/user/sows"],
    enabled: isAuthenticated,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/user/sows/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/sows"] });
      toast({
        title: "SOW Deleted",
        description: "The Statement of Work has been removed from your profile.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete the SOW. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  if (authLoading) {
    return (
      <main id="main-content" className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main id="main-content" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 cyber-grid opacity-30" />
        
        <SEO title="Profile | Skylyfe Tech" description="View your profile and saved SOWs" />
        <Card className="relative max-w-md w-full mx-4 border-primary/20 shadow-[0_0_40px_hsla(187,100%,50%,0.1)]">
          <CardHeader className="text-center">
            <div className="h-16 w-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center shadow-[0_0_25px_hsla(187,100%,50%,0.4)] mb-4">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold" data-testid="text-login-required-profile">
              Sign in to view your <span className="gradient-text">Profile</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Access your saved SOWs and account information.
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => { window.location.href = "/api/login"; }}
              className="w-full gap-2 gradient-primary hover:opacity-90 transition-all duration-300 hover-glow border-0"
              size="lg"
              data-testid="button-profile-login"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main id="main-content" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

      <SEO title="Profile | Skylyfe Tech" description="View your profile and saved SOWs" />
      
      <div className="relative max-w-5xl mx-auto px-6 py-8">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-6 gap-2 hover:bg-primary/10"
          data-testid="button-back-home"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          <aside className="lg:col-span-1">
            <Card className="border-primary/10 shadow-[0_0_30px_hsla(187,100%,50%,0.05)]">
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto">
                  <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                    <AvatarImage src={user?.profileImageUrl || undefined} alt={user?.firstName || "User"} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl font-bold">
                      {getInitials(user?.firstName, user?.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-green-500 border-2 border-background" />
                </div>
                <h1 className="text-xl font-bold mt-4" data-testid="text-user-name">
                  {user?.firstName} {user?.lastName}
                </h1>
              </CardHeader>
              <CardContent className="space-y-4">
                {user?.email && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm truncate" data-testid="text-user-email">{user.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/5 border border-secondary/10">
                  <Calendar className="h-4 w-4 text-secondary" />
                  <span className="text-sm">
                    Member since {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
                  </span>
                </div>
                <Button
                  onClick={() => setLocation("/scope")}
                  className="w-full gap-2 gradient-primary hover:opacity-90 transition-all duration-300 hover-glow border-0"
                  data-testid="button-new-sow"
                >
                  <Rocket className="h-4 w-4" />
                  Create New SOW
                </Button>
              </CardContent>
            </Card>
          </aside>

          <div className="lg:col-span-2">
            <Card className="border-primary/10 shadow-[0_0_30px_hsla(187,100%,50%,0.05)]">
              <CardHeader className="border-b border-primary/10">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-[0_0_15px_hsla(187,100%,50%,0.3)]">
                    <FileText className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold" data-testid="text-sow-history-title">
                      Your SOW History
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {savedSows?.length || 0} saved document{savedSows?.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {sowsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : !savedSows?.length ? (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No SOWs Yet</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Create your first Statement of Work to see it here.
                    </p>
                    <Button
                      onClick={() => setLocation("/scope")}
                      className="gap-2 gradient-primary hover:opacity-90 transition-all duration-300 hover-glow border-0"
                      data-testid="button-create-first-sow"
                    >
                      <Rocket className="h-4 w-4" />
                      Create Your First SOW
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedSows.map((sow) => {
                      const sowData = sow.sowData as SowOutput;
                      return (
                        <div
                          key={sow.id}
                          className="p-4 rounded-lg bg-card border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
                          data-testid={`card-sow-${sow.id}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold truncate group-hover:text-primary transition-colors" data-testid={`text-sow-title-${sow.id}`}>
                                {sow.projectTitle}
                              </h3>
                              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {sow.clientName}
                                </span>
                                {sow.clientOrganization && (
                                  <span className="flex items-center gap-1">
                                    <Building className="h-3 w-3" />
                                    {sow.clientOrganization}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(sow.createdAt)}
                                </span>
                              </div>
                              {sowData?.summary && (
                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                  {sowData.summary}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteMutation.mutate(sow.id)}
                                disabled={deleteMutation.isPending}
                                className="hover:bg-destructive/10 hover:text-destructive"
                                data-testid={`button-delete-sow-${sow.id}`}
                              >
                                {deleteMutation.isPending ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
