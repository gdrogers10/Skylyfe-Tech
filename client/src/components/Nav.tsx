import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Rocket, LogIn, LogOut, User } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";
import logoImage from "@assets/Skylyfe_Tech_1767155638633.png";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        data-testid="link-skip-to-content"
      >
        Skip to content
      </a>
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
          <img src={logoImage} alt="Skylyfe Technologies" className="h-20 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1 ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
              data-testid={`link-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/scope">
            <Button className="gap-2" data-testid="button-scope-cta">
              <Rocket className="h-4 w-4" />
              {site.hero.primaryCta.text}
            </Button>
          </Link>
          {!isLoading && (
            isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-user-menu">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profileImageUrl || undefined} alt={user.firstName || "User"} />
                      <AvatarFallback>{getInitials(user.firstName, user.lastName)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-muted-foreground" disabled>
                    <User className="h-4 w-4 mr-2" />
                    {user.email || user.firstName || "User"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout()} data-testid="button-logout">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" className="gap-2" onClick={() => { window.location.href = "/api/login"; }} data-testid="button-login">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            )
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-sm font-medium py-2 transition-colors ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/scope" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mt-2 gap-2" data-testid="button-mobile-scope-cta">
                <Rocket className="h-4 w-4" />
                {site.hero.primaryCta.text}
              </Button>
            </Link>
            {!isLoading && (
              isAuthenticated && user ? (
                <div className="pt-3 border-t border-border mt-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profileImageUrl || undefined} alt={user.firstName || "User"} />
                      <AvatarFallback>{getInitials(user.firstName, user.lastName)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{user.email || user.firstName}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2" 
                    onClick={() => { setMobileMenuOpen(false); logout(); }}
                    data-testid="button-mobile-logout"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full mt-2 gap-2" 
                  onClick={() => { setMobileMenuOpen(false); window.location.href = "/api/login"; }}
                  data-testid="button-mobile-login"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
