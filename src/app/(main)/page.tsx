import { InjuryRiskAssessment } from "@/components/dashboard/injury-risk-assessment";
import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { FlaskConical, FileVideo } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function DashboardPage() {
  const analyzeImage = PlaceHolderImages.find(p => p.id === 'analyze-technique');
  const planImage = PlaceHolderImages.find(p => p.id === 'get-my-plan');

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <PageHeader>
        <PageHeaderTitle>Welcome Back, Champion!</PageHeaderTitle>
        <PageHeaderDescription>
          Here's your mission for today. Let's get to it!
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InjuryRiskAssessment />
        </div>
        <div className="space-y-6">
            <Link href="/analysis" className="relative block group overflow-hidden rounded-lg">
                <Card>
                    {analyzeImage && <Image src={analyzeImage.imageUrl} alt={analyzeImage.description} width={400} height={300} className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105" data-ai-hint={analyzeImage.imageHint}/>}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end p-6">
                        <FileVideo className="size-8 mb-2 text-white" />
                        <span className="font-semibold text-lg text-white text-center">Form Check-up</span>
                    </div>
                </Card>
            </Link>
            <Link href="/plan" className="relative block group overflow-hidden rounded-lg">
                <Card>
                    {planImage && <Image src={planImage.imageUrl} alt={planImage.description} width={400} height={300} className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105" data-ai-hint={planImage.imageHint} />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end p-6">
                        <FlaskConical className="size-8 mb-2 text-white" />
                        <span className="font-semibold text-lg text-white text-center">Today's Game Plan</span>
                    </div>
                </Card>
            </Link>
        </div>
      </div>
    </div>
  );
}
