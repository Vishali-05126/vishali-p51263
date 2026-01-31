import { InjuryRiskAssessment } from "@/components/dashboard/injury-risk-assessment";
import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { FlaskConical, BookOpen, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function DashboardPage() {
  const actionCards = [
    {
      href: "/analysis",
      label: "Pre-Workout Scan",
      icon: Zap,
      image_id: "analyze-technique",
    },
    {
      href: "/plan",
      label: "Today's Warm-up",
      icon: FlaskConical,
      image_id: "get-my-plan",
    },
    {
      href: "/learn",
      label: "Injury Intel",
      icon: BookOpen,
      image_id: "learn-acl",
    },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <PageHeader>
        <PageHeaderTitle>Welcome Back, Champion!</PageHeaderTitle>
        <PageHeaderDescription>
          Here's your mission for today. Let's get to it!
        </PageHeaderDescription>
      </PageHeader>
      <div className="space-y-8">
        <InjuryRiskAssessment />
        
        <div>
          <h3 className="text-2xl font-semibold font-headline tracking-tight mb-4">Quick Actions</h3>
          <Carousel 
            opts={{
              align: "start",
            }} 
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {actionCards.map((card, index) => {
                const cardImage = PlaceHolderImages.find(p => p.id === card.image_id);
                return (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Link href={card.href} className="relative block group overflow-hidden rounded-lg h-full">
                      <Card className="h-full">
                        {cardImage && <Image src={cardImage.imageUrl} alt={cardImage.description} width={400} height={300} className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105" data-ai-hint={cardImage.imageHint} />}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-end p-6">
                          <card.icon className="size-8 mb-2 text-white" />
                          <span className="font-semibold text-lg text-white text-center">{card.label}</span>
                        </div>
                      </Card>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
