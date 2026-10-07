import { HistoryTable } from "@/components/history/HistoryTable";
import { useHistory } from "@/hooks/useHistory";

export function HistoryPage() {
  const { data: sessions = [], isLoading, isError, error } = useHistory();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-xl font-semibold tracking-tight">Screening History</h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Screening history is stored in this browser and removed after 30 days.
      </p>
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading history…</p>
      ) : isError ? (
        <p role="alert" className="text-sm text-destructive">{error.message}</p>
      ) : sessions.length === 0 ? (
        <p className="rounded-md border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
          No screening sessions are saved in this browser yet.
        </p>
      ) : (
        <HistoryTable sessions={sessions} />
      )}
    </main>
  );
}
