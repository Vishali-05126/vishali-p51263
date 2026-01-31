import { LoadChart } from "@/components/progress/load-chart";
import { Gamification } from "@/components/progress/gamification";
import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function ProgressPage() {
  const progressImage = PlaceHolderImages.find(p => p.id === 'progress');

  return (
    <div className="space-y-8">
       <div className="relative h-48 md:h-64 w-full">
        {progressImage && <Image src={progressImage.imageUrl} alt={progressImage.description} fill style={{objectFit: 'cover'}} className="opacity-30" data-ai-hint={progressImage.imageHint} />}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 absolute bottom-0 left-0 right-0">
          <PageHeader className="mb-0">
            <PageHeaderTitle>Progress &amp; Achievements</PageHeaderTitle>
            <PageHeaderDescription>
              Track your workload, complete quests, and earn badges on your journey to peak performance.
            </PageHeaderDescription>
          </PageHeader>
        </div>
      </div>
      
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8 -mt-8">
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
    </div>
  );
}
