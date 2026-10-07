import { LoaderCircle } from "lucide-react";

export function AnalysisProgress({ running }) {
  if (!running) return null;

  return (
    <section role="status" aria-live="polite" className="rounded-md border border-border bg-card p-6">
      <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
      <p className="mt-3 text-sm font-medium">Screening candidates</p>
      <p className="mt-1 text-sm text-muted-foreground">
        The backend is analyzing the workbook. Larger spreadsheets may take a few minutes.
      </p>
    </section>
  );
}
