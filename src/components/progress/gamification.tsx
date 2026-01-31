import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Shield, Zap, Target, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const quests = [
  { title: "Mobility Master", description: "Complete 7 days of warm-ups.", progress: 5, total: 7, icon: Zap },
  { title: "Perfect Form", description: "Get a 'Great!' score on 3 check-ups.", progress: 1, total: 3, icon: Target },
  { title: "Sleep Champion", description: "Log 8+ hours of sleep for 5 nights.", progress: 4, total: 5, icon: CheckCircle2 },
  { title: "Weekly Warrior", description: "Finish all your goals for one week.", progress: 6, total: 7, icon: Shield },
];

const badges = [
  { icon: Shield, name: "Injury-Free Month", color: "bg-green-100 text-green-600" },
  { icon: Target, name: "First 100%", color: "bg-blue-100 text-blue-600" },
  { icon: Zap, name: "Workout Streak: 10", color: "bg-yellow-100 text-yellow-600" },
  { icon: Star, name: "Star Player", color: "bg-purple-100 text-purple-600" },
  { icon: CheckCircle2, name: "Perfect Squat Form", color: "bg-teal-100 text-teal-600" },
];

export function Gamification() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h4 className="font-semibold font-headline text-xl mb-4 bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">Active Quests</h4>
        <div className="space-y-4">
          {quests.map((quest) => (
            <Card key={quest.title}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <quest.icon className="size-6"/>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">{quest.title}</p>
                        <Badge variant="secondary" className="font-mono">{quest.progress}/{quest.total}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{quest.description}</p>
                    <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary mt-1">
                        <div className="h-full w-full flex-1 bg-primary transition-all rounded-full" style={{ width: `${(quest.progress / quest.total) * 100}%` }}/>
                    </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold font-headline text-xl mb-4 bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">Your Badge Case</h4>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div key={badge.name} className="flex flex-col items-center text-center gap-2">
              <div className={cn("relative size-20 rounded-full flex items-center justify-center", badge.color)}>
                  <badge.icon className="size-10" />
                  <div className="absolute inset-0 rounded-full bg-white/30 transform scale-75 -rotate-45" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
