"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMentalReadiness } from "@/app/actions";
import type { MentalReadinessOutput } from "@/ai/flows/mental-readiness-assessment";
import { Loader2, Bot, Sparkles, Meh, Frown, Star } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const formSchema = z.object({
    stressLevel: z.number().min(1).max(10),
    focusLevel: z.number().min(1).max(10),
    confidenceLevel: z.number().min(1).max(10),
    motivationLevel: z.number().min(1).max(10),
});

type FormData = z.infer<typeof formSchema>;

const ReadinessGauge = ({ score }: { score: number }) => {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (score / 100) * circumference;
    
    let color = "hsl(var(--chart-1))"; // Green
    let Icon = Star;
    if (score < 40) {
      color = "hsl(var(--chart-3))"; // Red
      Icon = Frown;
    } else if (score < 70) {
      color = "hsl(var(--chart-2))"; // Yellow
      Icon = Meh;
    }
  
    return (
      <div className="relative size-48">
        <svg className="size-full" viewBox="0 0 100 100">
          <circle
            className="text-muted"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className="transition-all duration-500"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke={color}
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className="size-12 mb-1" style={{color}} />
          <span className="text-4xl font-bold font-headline" style={{color}}>{score}</span>
          <span className="text-sm text-muted-foreground">MindScore</span>
        </div>
      </div>
    );
  };

export function MentalReadinessChecker() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<MentalReadinessOutput | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stressLevel: 5,
      focusLevel: 7,
      confidenceLevel: 8,
      motivationLevel: 7,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await getMentalReadiness(data);
      setResult(response);
    } catch (error) {
      console.error("Error getting mental readiness:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const SliderField = ({ name, label }: { name: keyof FormData, label: string }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}: <span className="font-bold text-primary">{field.value}</span></FormLabel>
          <FormControl>
            <Slider
              defaultValue={[field.value]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => field.onChange(value[0])}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Mindset Check-in</CardTitle>
          <CardDescription>
            Rate your mindset from 1-10 to get a personalized mental game plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <SliderField name="stressLevel" label="Stress Level" />
              <SliderField name="focusLevel" label="Focus Level" />
              <SliderField name="confidenceLevel" label="Confidence" />
              <SliderField name="motivationLevel" label="Motivation" />
              
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 size-4"/>}
                Get My MindScore
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="flex flex-col bg-secondary">
        <CardHeader>
          <CardTitle>AI Mindset Coach</CardTitle>
          <CardDescription>
            Your mental game plan will show up here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col items-center justify-center gap-6">
          {isLoading && (
            <div className="flex flex-col items-center gap-4 text-center">
              <Loader2 className="size-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Reading your thoughts...</p>
            </div>
          )}
          {!isLoading && !result && (
             <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                <Bot className="mx-auto size-12 mb-4 text-primary/50" />
                <p>Ready to check in and sharpen your mental edge?</p>
              </div>
          )}
          {result && (
            <div className="w-full space-y-6 text-center">
                <div className="flex justify-center">
                    <ReadinessGauge score={Math.round(result.readinessScore)} />
                </div>
                <div>
                    <h4 className="font-semibold font-headline text-lg text-accent mb-2">Coach's Feedback</h4>
                    <p className="text-sm text-muted-foreground">{result.feedback}</p>
                </div>
                <div>
                    <h4 className="font-semibold font-headline text-lg text-accent mb-2">Today's Focus</h4>
                    <p className="text-sm text-muted-foreground">{result.recommendation}</p>
                </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
