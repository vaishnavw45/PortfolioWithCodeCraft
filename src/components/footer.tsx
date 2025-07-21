import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className="bg-card/30 border-t border-border py-6">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-center gap-4">
        <div className="flex gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/vaishnavw45" target="_blank" aria-label="GitHub">
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://linkedin.com/in/vaishnav-wakchuare" target="_blank" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground font-mono">
          &copy; {new Date().getFullYear()} Vaishnav Wakchaure. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
