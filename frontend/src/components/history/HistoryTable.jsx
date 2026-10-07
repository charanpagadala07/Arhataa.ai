import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { HistoryDetails } from "@/components/history/HistoryDetails";

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function HistoryTable({ sessions }) {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job</TableHead>
            <TableHead>Applicants</TableHead>
            <TableHead>Shortlist %</TableHead>
            <TableHead>Shortlisted</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow
              key={session.id}
              className="cursor-pointer"
              onClick={() => setSelectedId(session.id)}
            >
              <TableCell>{formatDate(session.timestamp)}</TableCell>
              <TableCell className="font-medium">{session.jobTitle}</TableCell>
              <TableCell>{session.applicantCount.toLocaleString()}</TableCell>
              <TableCell>{session.shortlistPercent}%</TableCell>
              <TableCell>{session.shortlistedCount}</TableCell>
              <TableCell>
                <Badge>{session.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <HistoryDetails id={selectedId} open={Boolean(selectedId)} onOpenChange={(open) => !open && setSelectedId(null)} />
    </>
  );
}
