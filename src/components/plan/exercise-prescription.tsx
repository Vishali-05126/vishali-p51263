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
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getExercisePlan } from "@/app/actions";
import type { PersonalizedExerciseRecommendationsOutput } from "@/ai/flows/personalized-exercise-recommendations";
import { Loader2, Bot, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const formSchema = z.object({
    injuryRiskScore: z.number().min(0).max(100),
    recentPerformance: z.string().min(10, "Please provide more details."),
    painFeedback: z.string().min(10, "Please provide more details."),
    sleepData: z.string().min(10, "Please provide more details."),
    hrvData: z.string().min(10, "Please provide more details."),
});

type FormData = z.infer<typeof formSchema>;

export function ExercisePrescription() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<PersonalizedExerciseRecommendationsOutput | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      injuryRiskScore: 50,
      recentPerformance: "Felt strong during my last workout but my pace was slower than usual.",
      painFeedback: "Slight soreness in my left calf.",
      sleepData: "7 hours, but woke up a few times.",
      hrvData: "HRV is 55ms, which is average for me.",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await getExercisePlan(data);
      setResult(response);
    } catch (error) {
      console.error("Error getting exercise plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Build Your Plan</CardTitle>
          <CardDescription>
            Update your info to get a new game plan from your AI coach.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="injuryRiskScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Readiness Score: {field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[field.value]}
                        max={100}
                        step={1}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recentPerformance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How'd You Do Last Time?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="How was your last practice or game?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="painFeedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Any Aches or Pains?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us if anything is sore." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sleepData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How'd You Sleep?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Did you sleep like a champ?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="hrvData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Energy Level (HRV)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What's your latest energy reading?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 size-4"/>}
                Generate My Plan
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>AI Coach's Game Plan</CardTitle>
          <CardDescription>
            Your personalized routine for today will show up here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          {isLoading && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="size-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Creating your plan...</p>
            </div>
          )}
          {!isLoading && !result && (
             <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                <Bot className="mx-auto size-12 mb-4 text-primary/50" />
                <p>Fill out your info to get a personalized game plan!</p>
              </div>
          )}
          {result && (
            <div className="w-full space-y-4">
               <h4 className="font-semibold font-headline text-lg bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">Today's Mission:</h4>
               <div className="prose prose-sm text-muted-foreground max-w-none whitespace-pre-wrap rounded-md border p-4 bg-secondary/50">
                {result.exerciseRecommendations}
               </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
