import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const badgeVariant = {
  "Strong Match": "strong",
  "Good Match": "good",
  "Potential Match": "potential",
};

export function CandidateTable({ candidates, onSelect }) {
  const [sortDir, setSortDir] = useState("desc");

  const rows = useMemo(() => {
    return [...candidates].sort((a, b) =>
      sortDir === "desc" ? b.matchScore - a.matchScore : a.matchScore - b.matchScore,
    );
  }, [candidates, sortDir]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-14">Rank</TableHead>
          <TableHead>Candidate</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>
            <button
              type="button"
              className="inline-flex items-center gap-1"
              onClick={() => setSortDir((current) => (current === "desc" ? "asc" : "desc"))}
            >
              Match Score
              {sortDir === "desc" ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />}
            </button>
          </TableHead>
          <TableHead>Recommendation</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>LinkedIn</TableHead>
          <TableHead>Portfolio</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((candidate) => (
          <TableRow
            key={candidate.id}
            className="cursor-pointer"
            onClick={() => onSelect(candidate)}
          >
            <TableCell className="text-muted-foreground">{candidate.rank}</TableCell>
            <TableCell className="font-medium">{candidate.name}</TableCell>
            <TableCell className="text-muted-foreground">{candidate.email || "—"}</TableCell>
            <TableCell>{candidate.matchScore}%</TableCell>
            <TableCell>
              <Badge variant={badgeVariant[candidate.recommendation]}>{candidate.recommendation}</Badge>
            </TableCell>
            <TableCell className="min-w-72 whitespace-normal">{candidate.reason || "—"}</TableCell>
            <TableCell>
              {candidate.linkedin ? (
                <a
                  href={candidate.linkedin}
                  className="text-primary hover:underline"
                  onClick={(event) => event.stopPropagation()}
                  target="_blank"
                  rel="noreferrer"
                >
                  Profile
                </a>
              ) : "—"}
            </TableCell>
            <TableCell>
              {candidate.portfolio ? (
                <a
                  href={candidate.portfolio}
                  className="text-primary hover:underline"
                  onClick={(event) => event.stopPropagation()}
                  target="_blank"
                  rel="noreferrer"
                >
                  Site
                </a>
              ) : "—"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
