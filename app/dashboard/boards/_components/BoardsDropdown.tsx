"use client";
import { useGetBoards } from "@/utils/hooks/useBoards";
import { usePathname } from "next/navigation";
import { CreateNewBoard } from "./CreateNewBoard";
import BoardLink from "@/components/BoardLink";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Board = {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  slug: string | null;
};

const BoardsDropdown = ({
  isBoardsExpanded,
}: {
  isBoardsExpanded: boolean;
}) => {
  const { data, isLoading, isError, error } = useGetBoards();
  const [boards, setBoards] = useState<Board[]>([]);

  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

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
          const { id, title } = board;
          const href = title.split(" ")[0];
          const isBoardActive = isActive(`/dashboard/boards/${href}`);

          return (
            <BoardLink key={id} isActive={isBoardActive} href={href}>
              {title}
            </BoardLink>
          );
        })}

        <CreateNewBoard boards={boards} setBoards={setBoards} />
      </div>
    </div>
  );
};

export default BoardsDropdown;
