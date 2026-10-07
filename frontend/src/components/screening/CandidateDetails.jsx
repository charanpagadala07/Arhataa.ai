import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const badgeVariant = {
  "Strong Match": "strong",
  "Good Match": "good",
  "Potential Match": "potential",
};

export function CandidateDetails({ candidate, open, onOpenChange }) {
  if (!candidate) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{candidate.name}</DialogTitle>
          <DialogDescription>{candidate.email}</DialogDescription>
        </DialogHeader>

        <div className="space-y-1 text-sm">
          <p>
            <span className="text-muted-foreground">LinkedIn: </span>
            {candidate.linkedin ? (
              <a href={candidate.linkedin} className="text-primary hover:underline" target="_blank" rel="noreferrer">
                {candidate.linkedin}
              </a>
            ) : "—"}
          </p>
          <p>
            <span className="text-muted-foreground">Portfolio: </span>
            {candidate.portfolio ? (
              <a href={candidate.portfolio} className="text-primary hover:underline" target="_blank" rel="noreferrer">
                {candidate.portfolio}
              </a>
            ) : "—"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-2xl font-semibold tracking-tight">{candidate.matchScore}%</p>
          <Badge variant={badgeVariant[candidate.recommendation]}>{candidate.recommendation}</Badge>
        </div>

        <p className="text-xs text-muted-foreground">
          {candidate.resume ? "Resume reference available in candidate data" : "No resume reference provided"}
        </p>

        <Separator />

        <div>
          <h3 className="text-sm font-medium">AI Reasoning</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{candidate.reason}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
