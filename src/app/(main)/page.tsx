import { InjuryRiskAssessment } from "@/components/dashboard/injury-risk-assessment";
import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { FlaskConical, BookOpen, Zap, BarChart3, User, MessageSquare, Brain } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

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
      href: "/mental-readiness",
      label: "Mental Check-in",
      icon: Brain,
      image_id: "mental-check",
    },
    {
      href: "/learn",
      label: "Injury Intel",
      icon: BookOpen,
      image_id: "learn-acl",
    },
    {
      href: "/progress",
      label: "My Stats",
      icon: BarChart3,
      image_id: "progress",
    },
     {
      href: "/team",
      label: "Team Hub",
      icon: MessageSquare,
      image_id: "soccer",
    },
    {
      href: "/profile",
      label: "My Profile",
      icon: User,
      image_id: "profile",
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {actionCards.map((card, index) => {
                const cardImage = PlaceHolderImages.find(p => p.id === card.image_id);
                return (
                    <Link key={index} href={card.href} className="relative block group overflow-hidden rounded-lg h-full">
                      <Card className="h-full">
                        {cardImage && <Image src={cardImage.imageUrl} alt={cardImage.description} width={400} height={300} className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105" data-ai-hint={cardImage.imageHint} />}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-end p-6">
                          <card.icon className="size-8 mb-2 text-white" />
                          <span className="font-semibold text-lg text-white text-center">{card.label}</span>
                        </div>
                      </Card>
                    </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
