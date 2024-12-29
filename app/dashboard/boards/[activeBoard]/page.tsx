"use client";

import dynamic from "next/dynamic";

const Columns = dynamic(() => import("../_components/Columns"), { ssr: false });
const CreateNewColumn = dynamic(
  () => import("../_components/CreateNewColumn"),
  { ssr: false },
);

export default function ActiveBoard() {
  return (
    <div className="flex h-full gap-[24px] p-[24px]">
      <Columns />
      <CreateNewColumn />
    </div>
  );
}
