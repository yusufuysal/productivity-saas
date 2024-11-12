//import { createClient } from "@/utils/supabase/server";
//import { redirect } from "next/navigation";
"use client";
import { use } from "react";

export default function Dashboard({
  params,
}: {
  params: Promise<{ activeBoard: string }>;
}) {
  const { activeBoard } = use(params);

  return (
    <>
      {/*<p className="text-heading-l text-mediumGray">
        This board is empty. Create a new column to get started.
      </p>
      <Button variant={"primary"} className="w-[174px] rounded-full">
        + Add New Column
      </Button>*/}
      {activeBoard}
    </>
  );
}
