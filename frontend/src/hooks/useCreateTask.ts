import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api";
import { Task } from "../types";

interface CreateTaskParams {
  title: string;
  parentId?: number;
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, parentId }: CreateTaskParams): Promise<Task> => {
      return createTask(title, parentId);
    },
    onSuccess: (newTask) => {
      queryClient.invalidateQueries({ queryKey: ["task", newTask.parentId ?? 0] });
    },
  });
}
