import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Shield, Zap, Target } from "lucide-react";

const quests = [
  { title: "Mobility Master", description: "Complete 7 consecutive days of mobility drills.", progress: 5, total: 7 },
  { title: "Perfect Form", description: "Get a 'Good' or 'Excellent' score on 3 technique analyses.", progress: 1, total: 3 },
  { title: "Recovery Pro", description: "Log 7+ hours of sleep for 5 nights in a row.", progress: 4, total: 5 },
  { title: "Consistency King", description: "Complete all prescribed workouts for one week.", progress: 6, total: 7 },
];

const badges = [
  { icon: Shield, name: "Injury-Free Month", color: "text-green-500" },
  { icon: Target, name: "First 100%", color: "text-blue-500" },
  { icon: Zap, name: "Workout Streak: 10", color: "text-yellow-500" },
  { icon: CheckCircle2, name: "Perfect Squat Form", color: "text-purple-500" },
];

export function Gamification() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h4 className="font-semibold font-headline mb-4">Active Quests</h4>
        <div className="space-y-4">
          {quests.map((quest) => (
            <Card key={quest.title}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{quest.title}</p>
                    <p className="text-sm text-muted-foreground">{quest.description}</p>
                  </div>
                  <Badge variant="secondary">{quest.progress}/{quest.total}</Badge>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary mt-2">
                    <div className="h-full w-full flex-1 bg-primary transition-all" style={{ width: `${(quest.progress / quest.total) * 100}%` }}/>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold font-headline mb-4">Earned Badges</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div key={badge.name} className="flex flex-col items-center text-center p-4 border rounded-lg bg-secondary/30">
              <badge.icon className={`size-10 mb-2 ${badge.color}`} />
              <span className="text-xs font-medium">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
