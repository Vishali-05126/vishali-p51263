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
import { Loader2, ShieldAlert } from "lucide-react";

const formSchema = z.object({
  historicalData: z.string().min(10, "Please provide more details."),
  workload: z.string().min(10, "Please provide more details."),
  recovery: z.string().min(10, "Please provide more details."),
  biomechanics: z.string().min(10, "Please provide more details."),
});

type FormData = z.infer<typeof formSchema>;

const RiskGauge = ({ score }: { score: number }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;
  const color = score > 75 ? "hsl(var(--primary))" : score > 40 ? "hsl(var(--chart-3))" : "hsl(var(--chart-2))";

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
        <span className="text-4xl font-bold font-headline">{score}</span>
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
      historicalData: "Completed 3 intense running sessions last week, feeling some fatigue.",
      workload: "Today's plan is a 5-mile tempo run.",
      recovery: "Slept 6 hours last night, HRV is slightly below baseline.",
      biomechanics: "Recent analysis showed slight right-side dominance during sprints.",
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
          <CardTitle>Predictive Injury Risk Scoring</CardTitle>
          <CardDescription>
            Fill in your data to get a daily injury risk score.
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
                    <FormLabel>Historical Data</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your recent training, performance, and workload..." {...field} />
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
                    <FormLabel>Today's Workload</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What is your planned workout for today?" {...field} />
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
                    <FormLabel>Recovery Metrics</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Note your sleep quality, HRV, soreness, etc." {...field} />
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
                    <FormLabel>Biomechanical Data</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any notes from recent gait/technique analysis?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Assess My Risk
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>AI Risk Analysis</CardTitle>
          <CardDescription>
            Your personalized risk assessment will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col items-center justify-center gap-6">
          {isLoading && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="size-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Analyzing your data...</p>
            </div>
          )}
          {!isLoading && !result && (
             <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                <ShieldAlert className="mx-auto size-12 mb-4 text-primary/50" />
                <p>Submit your data to see your injury risk assessment.</p>
              </div>
          )}
          {result && (
            <div className="w-full space-y-6 text-center">
              <div className="flex justify-center">
                <RiskGauge score={result.riskScore} />
              </div>
              <div>
                <h4 className="font-semibold font-headline mb-2">Risk Explanation</h4>
                <p className="text-sm text-muted-foreground">{result.riskExplanation}</p>
              </div>
              <div>
                <h4 className="font-semibold font-headline mb-2">Recommended Action</h4>
                <p className="text-sm text-muted-foreground">{result.recommendedAction}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
