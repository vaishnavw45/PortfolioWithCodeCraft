"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Code2, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

const navLinks = [
  { href: "#about", label: "01.about" },
  { href: "#projects", label: "02.projects" },
  { href: "#experience", label: "03.experience" },
  { href: "#ai-helper", label: "04.ai" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const observers: IntersectionObserver[] = [];
    const sections = navLinks.map(link => document.getElementById(link.href.substring(1))).filter(Boolean);
    
    // Add hero section for tracking
    const heroSection = document.getElementById("hero");
    if (heroSection) sections.unshift(heroSection);
    
    sections.forEach(section => {
      if (section) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
              }
            });
          },
          { rootMargin: "-30% 0px -70% 0px" }
        );
        observer.observe(section);
        observers.push(observer);
      }
    });


    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach(observer => observer.disconnect());
    };
  }, []);
  
  const NavLinkItems = ({ isMobile = false }: { isMobile?: boolean }) => navLinks.map((link) => {
    const sectionId = link.href.substring(1);
    const linkComponent = (
      <Link
        href={link.href}
        className={cn(
          "text-sm font-mono transition-colors hover:text-primary",
          activeSection === sectionId ? "text-primary" : "text-muted-foreground"
        )}
        onClick={() => isMobile && setIsSheetOpen(false)}
      >
        {link.label}
      </Link>
    );

    if (isMobile) {
      return (
        <SheetClose asChild key={link.href}>
          {linkComponent}
        </SheetClose>
      );
    }
    
    return (
      <React.Fragment key={link.href}>
       {linkComponent}
      </React.Fragment>
    )
  });


  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      scrolled ? "bg-background/80 border-b border-border backdrop-blur-lg" : "bg-transparent"
    )}>
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="#hero" className="flex items-center gap-2 text-primary hover:scale-105 transition-transform">
          <Code2 className="h-8 w-8" />
          <span className="font-headline text-xl font-bold">CodeCraft</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavLinkItems />
          <Button asChild variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            <Link href="#contact">Contact Me</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95">
              <div className="flex flex-col items-center justify-center h-full gap-8">
                <NavLinkItems isMobile={true} />
                 <SheetClose asChild>
                    <Button asChild variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                      <Link href="#contact">Contact Me</Link>
                    </Button>
                 </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
