import { Suspense } from "react";
import ReportsPage from "./ReportsPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReportsPage />
    </Suspense>
  );
}
