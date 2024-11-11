import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <main className="bg-dashboardMainContentColor ml-0 flex flex-1 flex-col items-center justify-center gap-6 px-4 md:ml-[261px] lg:ml-[300px]">
        <div className="flex flex-col items-center justify-center gap-[32px] text-center md:w-[459px] md:gap-[24px] md:px-[48px] lg:w-[493px] lg:px-0">
          <p className="text-heading-l text-mediumGray">
            This board is empty. Create a new column to get started.
          </p>
          <Button variant={"default"} className="w-[174px] rounded-full">
            + Add New Column
          </Button>
        </div>
      </main>
    </div>
  );
}
