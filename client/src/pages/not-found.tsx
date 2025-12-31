import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-background">
      <SEO 
        title="Page Not Found | Skylyfe Tech"
        description="The page you're looking for doesn't exist. Return to Skylyfe Technologies for emerging technology services."
        noIndex={true}
      />
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-bold">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            The page you're looking for doesn't exist. Please check the URL or return to our homepage.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
