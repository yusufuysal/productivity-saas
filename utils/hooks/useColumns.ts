import { useQuery } from "@tanstack/react-query";
import { getColumnsAction } from "../actions/columns";
import { useBoardStore } from "@/store/boardStore";

export const useGetColumns = () => {
  const { activeBoard } = useBoardStore();

  return useQuery({
    queryKey: ["get-columns"],
    queryFn: async () => {
      const { data, error } = await getColumnsAction(activeBoard?.id);
      if (error) {
        throw new Error(error);
      }

      return data;
    },
  });
};