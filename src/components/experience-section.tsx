"use client";

import { useRef, useEffect, useState } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';

const experiences = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Solutions Inc.',
    date: 'Jan 2021 - Present',
    description: 'Leading development of scalable web applications. Mentoring junior developers and improving our CI/CD pipeline. Spearheaded a migration to a microservices architecture, improving system resilience by 30%.',
    tags: ['React', 'Node.js', 'Kubernetes', 'GCP']
  },
  {
    title: 'Software Engineer',
    company: 'Innovate Co.',
    date: 'Jun 2018 - Dec 2020',
    description: 'Developed and maintained features for a large-scale e-commerce platform. Worked across the full stack, from database design to front-end implementation. Optimized API response times by 40%.',
    tags: ['Vue.js', 'Python', 'Django', 'AWS']
  },
  {
    title: 'Junior Web Developer',
    company: 'Digital Agency',
    date: 'May 2017 - May 2018',
    description: 'Built and maintained client websites using WordPress and custom themes. Gained foundational experience in HTML, CSS, JavaScript, and PHP. Assisted senior developers with various projects.',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress']
  },
];

const TimelineItem = ({ experience, isLeft }: { experience: (typeof experiences)[0], isLeft: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative mb-8 md:mb-0 transition-all duration-700 ease-out", isVisible ? 'opacity-100' : 'opacity-0', isLeft ? 'md:pr-8' : 'md:pl-8', isVisible ? (isLeft ? 'md:translate-x-0' : 'md:translate-x-0') : (isLeft ? 'md:-translate-x-5' : 'md:translate-x-5'))}>
       <div className="absolute top-5 hidden md:block w-4 h-4 bg-primary rounded-full z-10" style={isLeft ? {right: '-8px'} : {left: '-8px'}}></div>
      <Card className="bg-card/50 border-border hover:border-accent transition-colors duration-300">
        <CardHeader>
          <CardTitle className="font-headline text-xl text-primary">{experience.title}</CardTitle>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>{experience.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{experience.date}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{experience.description}</p>
          <div className="flex flex-wrap gap-2">
            {experience.tags.map(tag => (
              <Badge key={tag} variant="outline" className="font-mono">{tag}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function ExperienceSection() {
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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.disconnect();
    };
  }, []);
  
  return (
    <section id="experience" ref={sectionRef} className={cn("py-20 px-4 md:px-6 lg:px-8", isVisible ? 'animate-in fade-in slide-in-from-bottom-10 duration-1000' : 'opacity-0')}>
      <div className="container mx-auto">
        <h2 className="font-headline text-3xl font-bold mb-2 text-center">
          <span className="font-mono text-primary text-2xl">03.</span> Where I've Worked
        </h2>
        <p className="text-center text-muted-foreground mb-16">My professional journey so far.</p>
        <div className="relative md:grid md:grid-cols-2 md:gap-x-8 timeline">
          {experiences.map((exp, index) => (
            <div key={index} className={cn('col-start-1 col-end-2 md:col-start-auto md:col-end-auto', index % 2 === 0 ? 'md:col-start-1 md:col-end-2' : 'md:col-start-2 md:col-end-3 md:mt-16')}>
              <TimelineItem experience={exp} isLeft={index % 2 === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
