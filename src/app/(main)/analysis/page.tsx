import { TechniqueFeedback } from "@/components/analysis/technique-feedback";
import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "@/components/page-header";

export default function AnalysisPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <PageHeader>
        <PageHeaderTitle>Technique Check-up</PageHeaderTitle>
        <PageHeaderDescription>
          Upload a video of your moves to get tips from our AI coach.
        </PageHeaderDescription>
      </PageHeader>
      <TechniqueFeedback />
    </div>
  );
}
