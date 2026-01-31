import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function TeamPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <PageHeader>
        <PageHeaderTitle>Team Hub</PageHeaderTitle>
        <PageHeaderDescription>
          Connect with your teammates and coaches.
        </PageHeaderDescription>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground p-12">
            <Users className="size-16 mb-4 text-primary" />
            <p className="font-semibold text-lg">Team features are under construction.</p>
            <p className="text-sm">Stay tuned for leaderboards, challenges, and direct messaging.</p>
        </CardContent>
      </Card>
    </div>
  );
}
