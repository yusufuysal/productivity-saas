"use client";
import { useEffect } from "react";

import { useGetBoards } from "@/utils/hooks/useBoards";
import { useBoardStore } from "@/store/boardStore";

import { CreateNewBoard } from "./CreateNewBoard";
import BoardLink from "@/components/BoardLink";

import { cn } from "@/lib/utils";

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

  useEffect(() => {
    if (data) setBoards(data);
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!boards?.length) {
    return null;
  }
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

          return (
            <BoardLink
              key={id}
              isActive={board === activeBoard}
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
