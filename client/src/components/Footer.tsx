import { Link } from "wouter";
import { site } from "@/content/site";
import { SiInstagram, SiGithub } from "react-icons/si";
import { Rocket, Zap } from "lucide-react";
import logoImage from "@assets/Skylyfe_Tech_1767155638633.png";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

const serviceLinks = [
  { label: "AI/ML & GenAI", href: "/services/ai-ml-genai" },
  { label: "Spatial/AR", href: "/services/spatial-ar" },
  { label: "3D Printing", href: "/services/3d-printing-prototyping" },
  { label: "IoT & GPS", href: "/services/iot-gps-tracking" },
];

const legalLinks = [
  { label: "Terms of Service", href: "/legal#terms" },
  { label: "Privacy Policy", href: "/legal#privacy" },
];

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`relative bg-gradient-to-b from-card to-background border-t border-primary/10 overflow-hidden ${className}`}>
      {/* Subtle background decoration */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group" data-testid="link-footer-logo">
              <img src={logoImage} alt="Skylyfe Technologies" className="h-20 w-auto transition-transform duration-300 group-hover:scale-105" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {site.tagline}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-all duration-300"
                aria-label="Instagram"
                data-testid="link-social-instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-all duration-300"
                aria-label="GitHub"
                data-testid="link-social-github"
              >
                <SiGithub className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-primary flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-secondary flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                    data-testid={`link-footer-service-${link.label.toLowerCase().replace(/[/\s&]+/g, '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-primary">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  data-testid="link-footer-email"
                >
                  {site.email}
                </a>
              </li>
              <li className="text-muted-foreground">{site.address}</li>
            </ul>
            
            {/* CTA */}
            <div className="pt-4">
              <Link href="/scope">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/20 text-sm font-medium text-primary hover:from-primary/30 hover:to-secondary/30 transition-all duration-300 cursor-pointer">
                  <Rocket className="w-4 h-4" />
                  Start Your Project
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" suppressHydrationWarning>
            &copy; 2025 {site.fullName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
