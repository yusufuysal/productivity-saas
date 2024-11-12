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
    <>
      <p className="text-heading-l text-mediumGray">
        This board is empty. Create a new column to get started.
      </p>
      <Button variant={"primary"} className="w-[174px] rounded-full">
        + Add New Column
      </Button>
    </>
  );
}
