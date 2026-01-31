import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, Dumbbell, Wind } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const programs = [
    {
        title: "FIFA 11+ Warm-up",
        description: "A proven program to reduce soccer injuries by up to 50%. Focuses on stability, strength, and plyometrics.",
        icon: ShieldCheck,
        image_id: "learn-warmup"
    },
    {
        title: "Nordic Hamstring Protocol",
        description: "Strengthen your hamstrings to prevent strains, a common issue in sports with lots of running.",
        icon: Dumbbell,
        image_id: "learn-strength"
    },
    {
        title: "ACL Prevention Program",
        description: "Essential for athletes in cutting and pivoting sports. Learn proper landing and cutting mechanics.",
        icon: ShieldCheck,
        image_id: "learn-acl"
    },
    {
        title: "Shoulder Stability",
        description: "A must for overhead athletes (baseball, swimming, volleyball) to build strong, resilient shoulders.",
        icon: Dumbbell,
        image_id: "learn-shoulder"
    },
    {
        title: "Core Stability Essentials",
        description: "A strong core is your body's foundation. This program builds the strength needed to prevent back, hip, and knee injuries.",
        icon: Dumbbell,
        image_id: "learn-core"
    },
    {
        title: "Yoga for Athletes",
        description: "Improve flexibility, balance, and focus. A perfect complement to any training regimen for recovery and mental clarity.",
        icon: Wind,
        image_id: "learn-yoga"
    }
]

const articles = [
    {
        title: "The 5 Golden Rules of Injury Prevention",
        description: "Follow these five fundamental principles to dramatically reduce your risk of getting sidelined.",
        category: "General Principles",
        image_id: "learn-golden-rules"
    },
    {
        title: "Understanding Ankle Sprains",
        description: "Learn why they happen, how to treat them, and the best exercises to prevent them.",
        category: "Ankle & Foot",
        image_id: "learn-ankle"
    },
    {
        title: "Preventing Runner's Knee",
        description: "Pain around the kneecap? This guide covers causes and solutions for patellofemoral pain.",
        category: "Knee",
        image_id: "learn-knee"
    },
    {
        title: "Pitcher's Elbow 101",
        description: "Everything throwing athletes need to know about protecting their elbow joint from overuse.",
        category: "Arm & Shoulder",
        image_id: "learn-elbow"
    },
    {
        title: "Concussion Awareness",
        description: "Recognize the signs and symptoms of a concussion and understand the importance of 'when in doubt, sit it out'.",
        category: "Head",
        image_id: "learn-concussion"
    }
]


export default function LearnPage() {

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <PageHeader>
        <PageHeaderTitle>Prevention Library</PageHeaderTitle>
        <PageHeaderDescription>
          Knowledge is power. Learn how to stay healthy and on top of your game.
        </PageHeaderDescription>
      </PageHeader>

      <Tabs defaultValue="programs" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="programs">Prevention Programs</TabsTrigger>
          <TabsTrigger value="injury-info">Injury Info</TabsTrigger>
        </TabsList>
        <TabsContent value="programs" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => {
                const programImage = PlaceHolderImages.find(p => p.id === program.image_id);
                return (
                    <Card key={program.title} className="flex flex-col overflow-hidden hover:border-primary transition-colors cursor-pointer">
                        {programImage && <div className="relative h-40 w-full">
                            <Image src={programImage.imageUrl} alt={programImage.description} fill style={{objectFit: 'cover'}} data-ai-hint={programImage.imageHint} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>}
                         <CardHeader className="flex-row items-center gap-4 pt-4">
                            <div className="bg-primary/10 text-primary p-3 rounded-lg">
                                <program.icon className="size-6"/>
                            </div>
                            <div>
                                <CardTitle className="text-lg">{program.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground">{program.description}</p>
                        </CardContent>
                    </Card>
                )
            })}
          </div>
        </TabsContent>
        <TabsContent value="injury-info" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {articles.map((article) => {
                 const articleImage = PlaceHolderImages.find(p => p.id === article.image_id);
                return (
                    <Card key={article.title} className="flex flex-col overflow-hidden hover:border-accent transition-colors cursor-pointer">
                         {articleImage && <div className="relative h-40 w-full">
                            <Image src={articleImage.imageUrl} alt={articleImage.description} fill style={{objectFit: 'cover'}} data-ai-hint={articleImage.imageHint} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>}
                        <CardHeader>
                            <CardTitle className="text-lg">{article.title}</CardTitle>
                            <CardDescription>{article.category}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground">{article.description}</p>
                        </CardContent>
                    </Card>
                )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
