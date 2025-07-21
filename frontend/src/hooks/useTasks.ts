import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api";

export function useTasks(parentId?:number) {
    return useQuery({
        queryKey: ["task", parentId ?? 0],
        queryFn: () => fetchTasks(parentId),
        staleTime: Infinity
      })
}