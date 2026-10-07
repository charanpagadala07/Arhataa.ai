import { useMutation, useQueryClient } from "@tanstack/react-query";
import { analyzeCandidates, exportShortlist } from "@/api/screeningApi";

export function useAnalyzeCandidates() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: analyzeCandidates,
    onSuccess: (result) => {
      queryClient.setQueryData(["screening", result.id], result);
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
}

export function useExportShortlist() {
  return useMutation({
    mutationFn: exportShortlist,
  });
}
