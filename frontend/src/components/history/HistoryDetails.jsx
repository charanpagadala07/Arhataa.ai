import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useHistoryItem } from "@/hooks/useHistory";

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function HistoryDetails({ id, open, onOpenChange }) {
  const { data: session } = useHistoryItem(id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{session?.jobTitle ?? "Screening session"}</DialogTitle>
          <DialogDescription>
            This screening record is stored in this browser and removed after 30 days.
          </DialogDescription>
        </DialogHeader>
        {session && (
          <div className="space-y-3 text-sm">
            <p>
              <span className="text-muted-foreground">Date: </span>
              {formatDate(session.timestamp)}
            </p>
            <p>
              <span className="text-muted-foreground">Applicants: </span>
              {session.applicantCount.toLocaleString()}
            </p>
            <p>
              <span className="text-muted-foreground">Shortlist: </span>
              Top {session.shortlistPercent}% · {session.shortlistedCount} shortlisted
            </p>
            <p>
              <span className="text-muted-foreground">Result reference: </span>
              {session.resultId}
            </p>
            <div>
              <p className="text-muted-foreground">Job description</p>
              <p className="mt-1 whitespace-pre-wrap leading-6">{session.jobDescription}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
