"use client";

import { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateJobDescription } from '@/ai/flows/generate-job-description';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Sparkles } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

const formSchema = z.object({
  jobDescription: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }).max(500, {
    message: "Description must not exceed 500 characters."
  }),
});

export default function AiJobHelperSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setGeneratedDescription(null);
    try {
      const result = await generateJobDescription(values);
      setGeneratedDescription(result.detailedDescription);
    } catch (e) {
      setError("Failed to generate description. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="ai-helper" ref={sectionRef} className={cn("py-20 px-4 md:px-6 lg:px-8 bg-card/20", isVisible ? 'animate-in fade-in slide-in-from-bottom-10 duration-1000' : 'opacity-0')}>
      <div className="container mx-auto">
        <div className="text-center">
            <h2 className="font-headline text-3xl font-bold mb-2">
            <span className="font-mono text-primary text-2xl">04.</span> AI Job Description Helper
            </h2>
            <p className="text-muted-foreground mb-12">Struggling to describe your last role? Let AI give you a hand.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card className="bg-card/50 border-accent/30">
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Sparkles className="text-accent w-6 h-6"/> Generator</CardTitle>
                    <CardDescription>Enter a brief description of your job, and we'll expand it.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                            control={form.control}
                            name="jobDescription"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Brief Job Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="e.g., 'Built responsive UI components for an e-commerce site using React and TypeScript.'"
                                    className="resize-none"
                                    rows={5}
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    'Generate Description'
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="bg-card/50 min-h-[300px]">
                 <CardHeader>
                    <CardTitle className="font-headline text-xl">Generated Result</CardTitle>
                    <CardDescription>Your polished, AI-enhanced job description will appear here.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading && (
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                             <Skeleton className="h-4 w-full" />
                        </div>
                    )}
                    {error && <p className="text-destructive">{error}</p>}
                    {generatedDescription && (
                        <div className="prose prose-sm prose-invert text-muted-foreground whitespace-pre-wrap">
                            {generatedDescription}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
