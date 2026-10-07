import { getAccessToken } from "@/api/authApi";
import { addHistoryItem } from "@/api/historyApi";
import { csvEscape, downloadCsv } from "@/lib/utils";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");

async function readError(response) {
  const text = await response.text();
  if (!text) return `Request failed (${response.status}).`;

  try {
    const body = JSON.parse(text);
    return body.message ?? body.error ?? text;
  } catch {
    return text;
  }
}

async function screeningRequest(path, options = {}) {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  return response.json();
}

function recommendationLabel(recommendation) {
  switch (recommendation?.toUpperCase()) {
    case "STRONG_MATCH":
    case "STRONG MATCH":
      return "Strong Match";
    case "MODERATE_MATCH":
    case "MODERATE MATCH":
    case "GOOD MATCH":
      return "Good Match";
    case "LOW_MATCH":
    case "LOW MATCH":
    case "POTENTIAL MATCH":
      return "Potential Match";
    default:
      return recommendation ?? "Unrated";
  }
}

function externalUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

function mapCandidate(candidate, index, jobId) {
  return {
    id: `${jobId}-${candidate.rank ?? index + 1}`,
    rank: candidate.rank ?? index + 1,
    name: candidate.name ?? "Unnamed candidate",
    email: candidate.email ?? "",
    matchScore: candidate.score ?? 0,
    recommendation: recommendationLabel(candidate.recommendation),
    reason: candidate.reason ?? "",
    linkedin: externalUrl(candidate.linkedin),
    portfolio: externalUrl(candidate.portfolio),
    github: externalUrl(candidate.github),
    resume: candidate.resume ?? null,
  };
}

function getJobTitle(jobDescription) {
  return jobDescription.split("\n").map((line) => line.trim()).find(Boolean) ?? "Untitled role";
}

export async function analyzeCandidates({ file, jobDescription, screeningCriteria, shortlistPercent }) {
  if (!(file instanceof File)) {
    throw new Error("Choose an Excel spreadsheet before starting screening.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("jobDescription", jobDescription);
  formData.append("screeningCriteria", screeningCriteria);

  const job = await screeningRequest("/api/screening/analyze", {
    method: "POST",
    body: formData,
  });

  if (!job || typeof job !== "object" || job.id == null) {
    throw new Error("The screening service did not return a screening job ID.");
  }

  const shortlist = await screeningRequest(
    `/api/screening/${encodeURIComponent(job.id)}/shortlist?percentage=${encodeURIComponent(shortlistPercent)}`,
  );
  if (!shortlist || typeof shortlist !== "object" || !Array.isArray(shortlist.candidates)) {
    throw new Error("The screening service returned an invalid shortlist response.");
  }
  const candidates = shortlist.candidates.map((candidate, index) =>
    mapCandidate(candidate, index, job.id),
  );
  const averageMatch = candidates.length
    ? Math.round(candidates.reduce((sum, candidate) => sum + candidate.matchScore, 0) / candidates.length)
    : 0;

  const result = {
    id: String(job.id),
    createdAt: job.completedAt ?? job.createdAt ?? new Date().toISOString(),
    jobTitle: getJobTitle(jobDescription),
    jobDescription,
    shortlistPercent: shortlist.percentage ?? shortlistPercent,
    applicantCount: shortlist.totalCandidates ?? job.totalCandidates ?? candidates.length,
    candidates,
    stats: {
      applicants: shortlist.totalCandidates ?? job.totalCandidates ?? candidates.length,
      shortlisted: shortlist.shortlistedCandidates ?? candidates.length,
      averageMatch,
      strongMatches: candidates.filter((candidate) => candidate.recommendation === "Strong Match").length,
    },
  };

  try {
    addHistoryItem(result);
  } catch (error) {
    result.historyWarning = `Screening completed, but the browser could not save this session to history: ${error?.message ?? String(error)}`;
  }
  return result;
}

export async function exportShortlist(result) {
  if (!result?.candidates) {
    throw new Error("There are no shortlist results to export.");
  }

  const headers = ["Rank", "Name", "Email", "LinkedIn", "Portfolio", "Match Score", "Recommendation", "Reason"];
  const rows = result.candidates.map((candidate) => [
    candidate.rank,
    candidate.name,
    candidate.email,
    candidate.linkedin,
    candidate.portfolio,
    `${candidate.matchScore}%`,
    candidate.recommendation,
    candidate.reason,
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
  const filename = result.jobTitle.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
  downloadCsv(`shortlist-${filename || "results"}.csv`, csv);
  return { exported: true, count: result.candidates.length };
}
