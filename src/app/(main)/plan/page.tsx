import { ExercisePrescription } from "@/components/plan/exercise-prescription";
import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "@/components/page-header";

export default function PlanPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <PageHeader>
        <PageHeaderTitle>Adaptive Exercise Plan</PageHeaderTitle>
        <PageHeaderDescription>
          Get a personalized corrective routine that adapts daily to your body's needs.
        </PageHeaderDescription>
      </PageHeader>
      <ExercisePrescription />
    </div>
  );
}
