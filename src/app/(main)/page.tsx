import { InjuryRiskAssessment } from "@/components/dashboard/injury-risk-assessment";
import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical, FileVideo } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <PageHeader>
        <PageHeaderTitle>Dashboard</PageHeaderTitle>
        <PageHeaderDescription>
          Your daily injury prevention and performance overview.
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InjuryRiskAssessment />
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/analysis">
                <Card className="flex flex-col items-center justify-center p-6 hover:bg-accent transition-colors">
                  <FileVideo className="size-8 mb-2 text-primary" />
                  <span className="font-semibold text-center">Analyze Technique</span>
                </Card>
              </Link>
              <Link href="/plan">
                <Card className="flex flex-col items-center justify-center p-6 hover:bg-accent transition-colors">
                  <FlaskConical className="size-8 mb-2 text-primary" />
                  <span className="font-semibold text-center">Get My Plan</span>
                </Card>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
