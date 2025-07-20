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
    title: 'Project Alpha',
    description: 'A web-based platform for real-time data visualization and analytics, helping businesses make informed decisions.',
    image: 'https://placehold.co/1200x800.png',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'D3.js', 'Firebase'],
    github: 'https://github.com',
    demo: 'https://github.com',
    aiHint: 'data dashboard'
  },
  {
    title: 'Project Beta',
    description: 'A mobile-first social networking app designed to connect people with shared interests in their local area.',
    image: 'https://placehold.co/1200x800.png',
    stack: ['React Native', 'Node.js', 'GraphQL', 'PostgreSQL'],
    github: 'https://github.com',
    demo: 'https://github.com',
    aiHint: 'mobile application'
  },
  {
    title: 'Project Gamma',
    description: 'An e-commerce solution with a custom CMS for a boutique clothing brand, featuring a streamlined checkout process.',
    image: 'https://placehold.co/1200x800.png',
    stack: ['React', 'Redux', 'Express', 'MongoDB', 'Stripe API'],
    github: 'https://github.com',
    demo: 'https://github.com',
    aiHint: 'ecommerce website'
  },
  {
    title: 'Project Delta',
    description: 'A serverless microservices architecture for a high-traffic media streaming service.',
    image: 'https://placehold.co/1200x800.png',
    stack: ['AWS Lambda', 'API Gateway', 'Python', 'DynamoDB'],
    github: 'https://github.com',
    demo: null,
    aiHint: 'cloud architecture'
  },
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
