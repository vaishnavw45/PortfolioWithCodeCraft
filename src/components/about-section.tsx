"use client";

import { useRef, useEffect, useState } from 'react';
import { Code, Database, Server, PenTool, Bot, Cpu } from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const skills = [
  { name: 'TypeScript', level: 95 },
  { name: 'React & Next.js', level: 90 },
  { name: 'Node.js & Express', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'Firebase & GCP', level: 88 },
  { name: 'Tailwind CSS', level: 98 },
];

const techStack = {
  'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
  'Backend': ['Node.js', 'Express', 'Python', 'Flask', 'REST APIs'],
  'Databases': ['PostgreSQL', 'MongoDB', 'Firebase Firestore', 'Redis'],
  'DevOps & Tools': ['Docker', 'Git', 'GitHub Actions', 'Vercel', 'GCP'],
}

const AnimatedSkillBar = ({ skill }: { skill: { name: string; level: number } }) => {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProgress(skill.level);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.disconnect();
    };
  }, [skill.level]);

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-muted-foreground">{skill.name}</span>
        <span className="text-sm font-medium text-primary">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2 [&>div]:bg-primary transition-all duration-1000 ease-out" />
    </div>
  );
};


export default function AboutSection() {
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
    <section id="about" ref={sectionRef} className={cn("min-h-dvh py-20 px-4 md:px-6 lg:px-8", isVisible ? 'animate-in fade-in slide-in-from-bottom-10 duration-1000' : 'opacity-0')}>
      <div className="container mx-auto">
        <h2 className="font-headline text-3xl font-bold mb-2 text-center">
          <span className="font-mono text-primary text-2xl">01.</span> About Me
        </h2>
        <p className="text-center text-muted-foreground mb-12">A little bit about my journey and skills.</p>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2 flex justify-center">
            <div className="relative w-64 h-64">
              <Image
                src="https://placehold.co/400x400.png"
                alt="Alex Doe Portrait"
                width={400}
                height={400}
                className="rounded-lg object-cover z-10 relative border-2 border-primary shadow-lg"
                data-ai-hint="portrait man"
              />
              <div className="absolute -top-2 -left-2 w-full h-full rounded-lg bg-accent z-0 transform rotate-[-6deg]"></div>
            </div>
          </div>
          <div className="md:col-span-3 space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Hello! I'm Alex, a full-stack developer based in Techville, USA. My passion for technology started with a simple "Hello, World!" and has since grown into a full-fledged career building complex and engaging applications. I thrive on turning ideas into reality, from the database schema to the final pixel-perfect UI.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I'm not coding, you can find me exploring the latest advancements in AI, contributing to open-source projects, or brewing the perfect cup of coffee. I am a lifelong learner, always eager to pick up new skills and technologies.
            </p>
            <div className="space-y-4">
              {skills.map((skill) => (
                <AnimatedSkillBar key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20">
            <h3 className="font-headline text-2xl font-bold text-center mb-8">My Tech Arsenal</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(techStack).map(([category, techs]) => (
                     <Card key={category} className="bg-card/50 border-border hover:border-primary transition-colors duration-300">
                         <CardHeader className="flex flex-row items-center gap-4 pb-2">
                             {category === 'Frontend' && <Code className="w-6 h-6 text-primary"/>}
                             {category === 'Backend' && <Server className="w-6 h-6 text-primary"/>}
                             {category === 'Databases' && <Database className="w-6 h-6 text-primary"/>}
                             {category === 'DevOps & Tools' && <Cpu className="w-6 h-6 text-primary"/>}
                             <CardTitle className="font-headline text-lg">{category}</CardTitle>
                         </CardHeader>
                         <CardContent className="flex flex-wrap gap-2 pt-2">
                             {techs.map(tech => <Badge key={tech} variant="secondary" className="font-mono">{tech}</Badge>)}
                         </CardContent>
                     </Card>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
