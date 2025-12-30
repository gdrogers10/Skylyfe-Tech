interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-b from-background to-card border-b border-border py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-page-title">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-page-subtitle">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
