import { ExercisePrescription } from "@/components/plan/exercise-prescription";
import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "@/components/page-header";

export default function PlanPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <PageHeader>
        <PageHeaderTitle>Your Daily Game Plan</PageHeaderTitle>
        <PageHeaderDescription>
          Get a personalized routine that changes with you every day!
        </PageHeaderDescription>
      </PageHeader>
      <ExercisePrescription />
    </div>
  );
}
