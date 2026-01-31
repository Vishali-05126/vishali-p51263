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
import { getTechniqueFeedback } from "@/app/actions";
import type { AnalyzeTechniqueOutput } from "@/ai/flows/technique-feedback-from-video-analysis";
import { Loader2, Video, Zap, CameraOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  movementDescription: z.string().min(1, "Please pick a move!"),
});

type FormData = z.infer<typeof formSchema>;

export function TechniqueFeedback() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<AnalyzeTechniqueOutput | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = React.useState<boolean | undefined>(undefined);
  const { toast } = useToast();

  React.useEffect(() => {
    const getCameraPermission = async () => {
      if (typeof window === 'undefined' || !navigator.mediaDevices) {
        setHasCameraPermission(false);
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();
  }, [toast]);

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
      // In a real app, you'd capture a video clip from the stream.
      // For this prototype, we'll continue to send mock data to the AI.
      const mockVideoDataUri = "data:video/mp4;base64,mock-data-from-live-feed";
      const response = await getTechniqueFeedback({
        movementDescription: data.movementDescription,
        videoDataUri: mockVideoDataUri,
      });
      setResult(response);
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem getting feedback from the AI coach.",
        });
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
            Pick a move and show me your form in the camera below!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
                <video ref={videoRef} className="w-full h-full object-cover scale-x-[-1]" autoPlay muted playsInline />
                {hasCameraPermission === false && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 p-4 text-center">
                        <CameraOff className="size-12 mb-4 text-destructive" />
                        <h3 className="text-lg font-semibold">Camera Access Required</h3>
                        <p className="text-sm text-muted-foreground">Please allow camera access in your browser to use this feature.</p>
                    </div>
                )}
                {hasCameraPermission === undefined && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                        <Loader2 className="size-8 animate-spin text-primary" />
                    </div>
                )}
              </div>
              
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

              <Button type="submit" disabled={isLoading || hasCameraPermission !== true} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 size-4" />}
                Scan My Form!
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
            <div className="flex flex-col items-center gap-4 text-center">
              <Loader2 className="size-12 animate-spin text-primary" />
              <p className="text-muted-foreground">The coach is thinking...<br/>This might take a moment.</p>
            </div>
          )}
          {!isLoading && !result && (
             <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                <Video className="mx-auto size-12 mb-4 text-primary/50" />
                <p>Ready when you are! Let's check that form.</p>
              </div>
          )}
          {result && (
            <div className="w-full space-y-6">
                <div>
                    <h4 className="font-semibold font-headline text-lg text-accent mb-2">Summary</h4>
                    <p className="text-sm text-muted-foreground">{result.overallSummary}</p>
                </div>
                <div>
                    <h4 className="font-semibold font-headline text-lg mb-4">Coach's Corrections</h4>
                    {result.feedback.length > 0 ? (
                        <div className="space-y-3">
                            {result.feedback.map((item, index) => (
                                <Card key={index} className="bg-secondary">
                                    <CardContent className="p-4 space-y-1.5">
                                        <div className="flex justify-between items-start gap-4">
                                            <p className="font-semibold flex-1">{item.issue}</p>
                                            {item.timestamp && <Badge variant="outline" className="whitespace-nowrap">{item.timestamp}</Badge>}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{item.correction}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">Looks great! No major corrections found.</p>
                    )}
                </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
