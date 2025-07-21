import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import AnimatedTyping from './animated-typing';
import { Button } from './ui/button';

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex h-[calc(100dvh-5rem)] min-h-[500px] w-full flex-col items-center justify-center text-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="space-y-2">
            <p className="font-mono text-sm text-accent md:text-base">Hi, my name is</p>
            <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-primary sm:text-5xl md:text-6xl lg:text-7xl">
              Vaishnav Wakchaure.
            </h1>
            <AnimatedTyping
              titles={[
                'I build things for the web.',
                'I am a Full-Stack Developer.',
                'I love solving complex problems.',
              ]}
              className="font-headline text-3xl font-bold tracking-tighter text-foreground/80 sm:text-4xl md:text-5xl lg:text-6xl"
            />
          </div>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            I am a passionate developer specializing in creating modern, responsive, and performant web applications. Let's build something amazing together.
          </p>
          <div className="flex gap-4 pt-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </div>
       <div className="absolute bottom-10 animate-bounce">
         <Link href="#about" aria-label="Scroll to about section">
          <ArrowDown className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors" />
         </Link>
       </div>
    </section>
  );
}
