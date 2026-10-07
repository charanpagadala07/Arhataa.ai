import { useQuery } from "@tanstack/react-query";
import { getHistory, getHistoryById } from "@/api/historyApi";

export function useHistory() {
  return useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
  });
}

export function useHistoryItem(id) {
  return useQuery({
    queryKey: ["history", id],
    queryFn: () => getHistoryById(id),
    enabled: Boolean(id),
  });
}
