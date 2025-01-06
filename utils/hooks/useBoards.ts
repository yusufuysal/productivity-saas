import { useQuery } from "@tanstack/react-query";

import { getBoardsAction } from "../actions/boards";

export const useGetBoards = () => {
  return useQuery({
    queryKey: ["get-boards"],
    queryFn: async () => {
      //await new Promise((resolve) => setTimeout(resolve, 2000));
      const { data, error } = await getBoardsAction();
      if (error) {
        throw new Error(error);
      }
      return data;
    },
  });
};
