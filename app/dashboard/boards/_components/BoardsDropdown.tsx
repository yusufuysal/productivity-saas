"use client";
import { useEffect } from "react";

import { useGetBoards } from "@/utils/hooks/useBoards";
import { useBoardStore } from "@/store/boardStore";

import { CreateNewBoard } from "./CreateNewBoard";
import BoardLink from "@/components/BoardLink";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Board = {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  slug: string;
};

const BoardsDropdown = ({
  isBoardsExpanded,
}: {
  isBoardsExpanded: boolean;
}) => {
  const { data, isLoading, isError, error } = useGetBoards();

  const { boards, setBoards, activeBoard, setActiveBoard } = useBoardStore();

  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  useEffect(() => {
    if (data) setBoards(data);
  }, [data]);

  useEffect(() => {
    boards?.map((board) => {
      const { slug } = board;

      const isBoardActive = isActive(`/dashboard/boards/${slug}`);

      if (isBoardActive) {
        setActiveBoard(board);
      }
    });
  }, [boards]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div
      className={cn(
        "overflow-hidden overflow-y-auto transition-[max-height] duration-700 ease-in-out",
        isBoardsExpanded ? "max-h-60" : "max-h-0",
      )}
    >
      <div className="my-2 flex flex-col gap-2">
        {boards.map((board) => {
          const { id, title, slug } = board;
          const isBoardActive = isActive(`/dashboard/boards/${slug}`);

          return (
            <BoardLink
              key={id}
              isActive={isBoardActive || activeBoard?.id === board.id}
              href={slug}
              onClick={() => setActiveBoard(board)}
            >
              {title}
            </BoardLink>
          );
        })}

        <CreateNewBoard />
      </div>
    </div>
  );
};

export default BoardsDropdown;
