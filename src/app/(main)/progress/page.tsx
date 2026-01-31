import { LoadChart } from "@/components/progress/load-chart";
import { Gamification } from "@/components/progress/gamification";
import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProgressPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <PageHeader>
        <PageHeaderTitle>Progress &amp; Achievements</PageHeaderTitle>
        <PageHeaderDescription>
          Track your workload, complete quests, and earn badges on your journey to peak performance.
        </PageHeaderDescription>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Longitudinal Load Management</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gamified Prevention Quests</CardTitle>
        </CardHeader>
        <CardContent>
          <Gamification />
        </CardContent>
      </Card>
    </div>
  );
}
