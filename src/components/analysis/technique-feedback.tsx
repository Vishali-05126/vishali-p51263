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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getTechniqueFeedback } from "@/app/actions";
import type { AnalyzeTechniqueOutput } from "@/ai/flows/technique-feedback-from-video-analysis";
import { Loader2, Video, Sparkles } from "lucide-react";

const formSchema = z.object({
  movementDescription: z.string().min(1, "Please pick a move!"),
  video: z
    .any()
    .refine((files) => files?.length == 1, "You need to upload a video!"),
});

type FormData = z.infer<typeof formSchema>;

export function TechniqueFeedback() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<AnalyzeTechniqueOutput | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      movementDescription: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setResult(null);
    try {
      // Mocking video to data URI conversion
      const mockVideoDataUri = "data:video/mp4;base64,mock-data";
      const response = await getTechniqueFeedback({
        movementDescription: data.movementDescription,
        videoDataUri: mockVideoDataUri,
      });
      setResult(response);
    } catch (error) {
      console.error("Error getting technique feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Send to Coach</CardTitle>
          <CardDescription>
            Pick a move and upload a short video for some tips.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="movementDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Move</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a move to get tips on" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Squat">Squat</SelectItem>
                        <SelectItem value="Sprint Start">Sprint Start</SelectItem>
                        <SelectItem value="Kettlebell Swing">Kettlebell Swing</SelectItem>
                        <SelectItem value="Deadlift">Deadlift</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Video</FormLabel>
                    <FormControl>
                      <Input type="file" accept="video/*" onChange={(e) => field.onChange(e.target.files)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 size-4" />}
                Get Feedback!
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>AI Coach's Tips</CardTitle>
          <CardDescription>
            Tips and tricks from our AI coach will show up here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col items-center justify-center">
        {isLoading && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="size-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Thinking...</p>
            </div>
          )}
          {!isLoading && !result && (
             <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                <Video className="mx-auto size-12 mb-4 text-primary/50" />
                <p>Send a video to get your coach's feedback.</p>
              </div>
          )}
          {result && (
            <div className="w-full space-y-4">
               <h4 className="font-semibold font-headline text-lg">AI Corrections:</h4>
               <div className="prose prose-sm text-muted-foreground max-w-none whitespace-pre-wrap rounded-md border p-4 bg-secondary/50">
                {result.biomechanicalFeedback}
               </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
