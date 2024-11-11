import Sidebar from "@/components/Sidebar";
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
      <main className="bg-dashboardMainContentColor ml-[150px] flex flex-1 flex-col items-center justify-center gap-6 px-4">
        Hello
        <div className="flex flex-col items-center justify-center gap-2">
          <pre className="max-h-32 overflow-auto rounded border p-3 font-mono text-xs">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </main>
    </div>
  );
}
