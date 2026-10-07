const HISTORY_KEY = "shortlistai.screeningHistory";

function readHistory() {
  const stored = localStorage.getItem(HISTORY_KEY);
  const history = stored ? JSON.parse(stored) : [];
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  return history.filter((item) => new Date(item.timestamp).getTime() >= cutoff);
}

function writeHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 50)));
}

export function addHistoryItem(result) {
  const history = readHistory();
  const item = {
    id: String(result.id),
    status: "Completed",
    timestamp: result.createdAt,
    resultId: String(result.id),
    jobTitle: result.jobTitle,
    jobDescription: result.jobDescription,
    applicantCount: result.applicantCount,
    shortlistPercent: result.shortlistPercent,
    shortlistedCount: result.stats.shortlisted,
  };
  writeHistory([item, ...history.filter((entry) => entry.id !== item.id)]);
}

export async function getHistory() {
  return readHistory();
}

export async function getHistoryById(id) {
  return readHistory().find((item) => item.id === String(id)) ?? null;
}
