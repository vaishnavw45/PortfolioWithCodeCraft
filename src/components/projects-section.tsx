"use client";

import { useRef, useEffect, useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const projects = [
  
  {
    title: 'StreamX',
    description: 'A fully-interactive OTT platform built using a modular React.js architecture. Features include dynamic content via TMDB API, Firebase authentication, and responsive UI with Swiper.js and Tailwind CSS.',

    image: '/images/project-1.png',


    stack: ['React.js', 'Firebase', 'TMDB API', 'Axios', 'Swiper.js', 'Tailwind CSS'],
    github: 'https://github.com/vaishnavw45/streamx',
    demo: 'https://github.com/vaishnavw45/streamx',
    aiHint: 'video streaming web app'
  },
  {
  title: 'BeatSync',
  description: 'A real-time, interactive music synchronization platform built as a Turborepo monorepo. Features a Next.js frontend, a custom backend server handling audio processing and real-time communication via WebSockets, and leverages Bun for fast development and package management.',
  image: '/images/project-3.png', // Placeholder, update with actual image path
  stack: ['Next.js', 'Bun', 'Turborepo', 'WebSockets', 'AWS S3 (for presigning)', 'TypeScript'],
  github: 'https://github.com/vaishnavw45/BeatSync', // Update if your repo URL changes
  demo: 'https://beat-sync-zeta.vercel.app/', // Placeholder: Add a link to your live demo once hosted
  aiHint: 'real-time music synchronization app'
},
  {
    title: 'Ayurveda',
    description: 'A role-based Android app for doctors, admins, and patients. Includes appointment scheduling, online payments, and eCommerce features, all backed by Firebase for authentication and real-time data.',

    image: '/images/project-2.png',



    stack: ['Java', 'Kotlin', 'Firebase', 'Android Studio', 'Figma'],
    github: 'https://github.com/vaishnavw45/ayurveda',
    demo: 'https://github.com/vaishnavw45/ayurveda',
    aiHint: 'healthcare android app'
  }
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) observer.disconnect();
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className={cn("min-h-dvh py-20 px-4 md:px-6 lg:px-8", isVisible ? 'animate-in fade-in slide-in-from-bottom-10 duration-1000' : 'opacity-0')}>
      <div className="container mx-auto">
        <h2 className="font-headline text-3xl font-bold mb-2 text-center">
          <span className="font-mono text-primary text-2xl">02.</span> Things I've Built
        </h2>
        <p className="text-center text-muted-foreground mb-12">A selection of my proudest work.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group flex flex-col bg-card/50 border-border overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={project.aiHint}
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardHeader>
                <CardTitle className="font-headline group-hover:text-primary transition-colors">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="font-mono">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
                    <Github className="h-5 w-5 text-muted-foreground hover:text-primary" />
                  </a>
                </Button>
                {project.demo && (
                  <Button variant="ghost" size="icon" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Live demo">
                      <ExternalLink className="h-5 w-5 text-muted-foreground hover:text-primary" />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
