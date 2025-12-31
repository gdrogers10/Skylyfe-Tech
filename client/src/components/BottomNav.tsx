import { Link, useLocation } from "wouter";
import { Home, Briefcase, Users, Mail, Rocket } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Briefcase },
  { label: "About", href: "/about", icon: Users },
  { label: "Contact", href: "/contact", icon: Mail },
  { label: "Launch", href: "/scope", icon: Rocket },
];

export function BottomNav() {
  const [location] = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border safe-area-bottom" aria-label="Mobile navigation">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full py-2 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
              data-testid={`link-bottom-nav-${item.label.toLowerCase()}`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
