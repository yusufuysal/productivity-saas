import { useQuery } from "@tanstack/react-query";
import { getBoardsAction } from "../actions/boards";

export const useGetBoards = () => {
  return useQuery({
    queryKey: ["get-boards"],
    queryFn: async () => {
      const { data, error } = await getBoardsAction();
      if (error) {
        throw new Error(error);
      }
      return data;
    },
  });
};
