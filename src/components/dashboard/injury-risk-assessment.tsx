"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
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
import { getInjuryRisk } from "@/app/actions";
import type { InjuryRiskAssessmentOutput } from "@/ai/flows/injury-risk-assessment";
import { Loader2, ShieldAlert, Smile, Meh, Frown, Sparkles } from "lucide-react";

const formSchema = z.object({
  historicalData: z.string().min(10, "Tell us a bit more!"),
  workload: z.string().min(10, "Tell us a bit more!"),
  recovery: z.string().min(10, "Tell us a bit more!"),
  biomechanics: z.string().min(10, "Tell us a bit more!"),
});

type FormData = z.infer<typeof formSchema>;

const RiskGauge = ({ score }: { score: number }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;
  
  let color = "hsl(var(--chart-1))"; // Green
  let Icon = Smile;
  if (score > 66) {
    color = "hsl(var(--chart-3))"; // Red
    Icon = Frown;
  } else if (score > 33) {
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
        <span className="text-sm text-muted-foreground">Risk Score</span>
      </div>
    </div>
  );
};


export function InjuryRiskAssessment() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<InjuryRiskAssessmentOutput | null>(
    null
  );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      historicalData: "I played soccer for an hour and felt a little tired.",
      workload: "Today I have practice for 2 hours.",
      recovery: "I slept for 8 hours and feel great!",
      biomechanics: "My coach said I'm running much faster now.",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await getInjuryRisk(data);
      setResult(response);
    } catch (error) {
      console.error("Error getting injury risk:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Check-in</CardTitle>
          <CardDescription>
            Tell us how you're feeling to get your readiness score!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="historicalData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How have your recent games/practices been?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g. Scored a goal, ran a fast lap..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workload"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What's the plan for today?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g. Soccer practice, a run in the park..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recovery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How did you rest?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g. Slept well, feel a bit tired..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="biomechanics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Any notes on your moves?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g. My jump shot is feeling good!" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 size-4" />}
                Get My Score!
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="flex flex-col bg-accent/10">
        <CardHeader>
          <CardTitle>AI Coach Analysis</CardTitle>
          <CardDescription>
            Your personalized readiness report will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col items-center justify-center gap-6">
          {isLoading && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="size-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Thinking...</p>
            </div>
          )}
          {!isLoading && !result && (
             <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                <ShieldAlert className="mx-auto size-12 mb-4 text-primary/50" />
                <p>Fill out the check-in to see your score!</p>
              </div>
          )}
          {result && (
            <div className="w-full space-y-6 text-center">
              <div className="flex justify-center">
                <RiskGauge score={Math.round(result.riskScore)} />
              </div>
              <div>
                <h4 className="font-semibold font-headline text-lg mb-2">Coach's Notes</h4>
                <p className="text-sm text-muted-foreground">{result.riskExplanation}</p>
              </div>
              <div>
                <h4 className="font-semibold font-headline text-lg mb-2">Today's Tip</h4>
                <p className="text-sm text-muted-foreground">{result.recommendedAction}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
