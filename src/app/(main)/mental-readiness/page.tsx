import { MentalReadinessChecker } from "@/components/mental-readiness/mental-readiness-checker";
import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "@/components/page-header";
import { BrainCircuit } from "lucide-react";

export default function MentalReadinessPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <PageHeader>
        <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <BrainCircuit className="size-8" />
            </div>
            <div>
                <PageHeaderTitle>Mental Readiness</PageHeaderTitle>
                <PageHeaderDescription>
                Check in with your mind. A strong mind builds a strong athlete.
                </PageHeaderDescription>
            </div>
        </div>
      </PageHeader>
      <MentalReadinessChecker />
    </div>
  );
}
