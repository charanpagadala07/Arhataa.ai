import { useEffect, useState } from "react";
import { ApplicantUpload } from "@/components/screening/ApplicantUpload";
import { JobDescription } from "@/components/screening/JobDescription";
import { ShortlistSlider } from "@/components/screening/ShortlistSlider";
import { AnalysisProgress } from "@/components/screening/AnalysisProgress";
import { ResultsSummary } from "@/components/screening/ResultsSummary";
import { CandidateTable } from "@/components/screening/CandidateTable";
import { CandidateDetails } from "@/components/screening/CandidateDetails";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAnalyzeCandidates, useExportShortlist } from "@/hooks/useScreening";
import { DEFAULT_JOB_DESCRIPTION, DEFAULT_SHORTLIST_PERCENT } from "@/lib/constants";

const DEFAULT_SCREENING_CRITERIA =
  "Prioritize relevant skills and experience that match the job description. Score every candidate from 0 to 100 and provide a concise reason for each score.";

export function HomePage() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState(DEFAULT_JOB_DESCRIPTION);
  const [screeningCriteria, setScreeningCriteria] = useState(DEFAULT_SCREENING_CRITERIA);
  const [percent, setPercent] = useState(DEFAULT_SHORTLIST_PERCENT);
  const [phase, setPhase] = useState("form");
  const [selected, setSelected] = useState(null);
  const analyze = useAnalyzeCandidates();
  const exportShortlist = useExportShortlist();
  const result = analyze.data;
  const inputsDisabled = phase === "analyzing";

  useEffect(() => {
    if (analyze.isSuccess && result) setPhase("results");
    if (analyze.isError) setPhase("form");
  }, [analyze.isSuccess, analyze.isError, result]);

  function handleAnalyze() {
    setSelected(null);
    setPhase("analyzing");
    analyze.mutate({ file, jobDescription, screeningCriteria, shortlistPercent: percent });
  }

  function handleNewScreening() {
    analyze.reset();
    exportShortlist.reset();
    setSelected(null);
    setPhase("form");
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight">New Candidate Screening</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload an Excel workbook and provide the job requirements to begin.
        </p>
      </div>

      {phase !== "results" && (
        <div className="grid gap-4">
          <ApplicantUpload file={file} onChange={setFile} disabled={inputsDisabled} />
          <JobDescription value={jobDescription} onChange={setJobDescription} disabled={inputsDisabled} />
          <section className="rounded-md border border-border bg-card p-4">
            <Label htmlFor="screening-criteria">Screening Criteria</Label>
            <p className="mt-1 text-xs text-muted-foreground">
              Tell the screening service what to prioritize in addition to the job description.
            </p>
            <Textarea
              id="screening-criteria"
              className="mt-3 min-h-28"
              value={screeningCriteria}
              disabled={inputsDisabled}
              onChange={(event) => setScreeningCriteria(event.target.value)}
            />
          </section>
          <ShortlistSlider percent={percent} onChange={setPercent} disabled={inputsDisabled} />
          {phase === "form" && (
            <div>
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={!file || !jobDescription.trim() || !screeningCriteria.trim() || analyze.isPending}
              >
                Analyze &amp; Shortlist
              </Button>
            </div>
          )}
          {phase === "analyzing" && <AnalysisProgress running />}
          {analyze.isError && (
            <div role="alert" className="rounded-md border border-destructive/30 bg-card p-4 text-sm">
              <p className="font-medium text-destructive">Screening failed</p>
              <p className="mt-1 text-muted-foreground">{analyze.error.message}</p>
            </div>
          )}
        </div>
      )}

      {phase === "results" && result && (
        <div className="space-y-5">
          {result.historyWarning && (
            <p role="status" className="rounded-md border border-border bg-card p-3 text-sm text-muted-foreground">
              {result.historyWarning}
            </p>
          )}
          <ResultsSummary stats={result.stats} shortlistPercent={result.shortlistPercent} />
          <div className="flex items-center justify-between gap-3">
            <Button variant="outline" onClick={handleNewScreening}>New screening</Button>
            <Button onClick={() => exportShortlist.mutate(result)} disabled={exportShortlist.isPending}>
              {exportShortlist.isPending ? "Preparing…" : "Export Shortlist"}
            </Button>
          </div>
          {exportShortlist.isError && (
            <p role="alert" className="text-sm text-destructive">{exportShortlist.error.message}</p>
          )}
          <CandidateTable candidates={result.candidates} onSelect={setSelected} />
          <CandidateDetails
            candidate={selected}
            open={Boolean(selected)}
            onOpenChange={(open) => !open && setSelected(null)}
          />
        </div>
      )}
    </main>
  );
}
