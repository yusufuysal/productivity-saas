"use client";

import BoardLink from "@/components/BoardLink";
import { cn } from "@/lib/utils";
import { useBoardStore } from "@/store/boardStore";
import { useGetBoards } from "@/utils/hooks/useBoards";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { CreateNewBoard } from "./CreateNewBoard";

const BoardsDropdown = ({
  isBoardsExpanded,
  setIsBoardsExpanded,
}: {
  isBoardsExpanded: boolean;
  setIsBoardsExpanded: (isExpanded: boolean) => void;
}) => {
  const { data, isLoading, isError, error } = useGetBoards();

  const { boards, setBoards, activeBoard, setActiveBoard } = useBoardStore();

  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  useEffect(() => {
    if (data) setBoards(data);
  }, [data]);

  useEffect(() => {
    setActiveBoard(null);
    boards?.map((board) => {
      const { slug } = board;

      const isBoardActive = isActive(`/dashboard/boards/${slug}`);

      if (isBoardActive) {
        setActiveBoard(board);
        setTimeout(() => {
          setIsBoardsExpanded(true);
        }, 400);
      }
    });
  }, [boards, pathname]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div
      className={cn(
        "overflow-hidden overflow-y-auto transition-[max-height] duration-700 ease-in-out",
        isBoardsExpanded ? "max-h-64" : "max-h-0",
      )}
    >
      <div className="my-2 flex flex-col gap-2">
        {boards.map((board) => {
          const { id, title, slug } = board;

          return (
            <BoardLink
              key={id}
              isActive={activeBoard?.id === board.id}
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
