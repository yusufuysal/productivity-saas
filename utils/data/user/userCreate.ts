"server only";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { userCreateProps } from "@/utils/types";

export const userCreate = async ({
  email,
  first_name,
  last_name,
  id,
}: userCreateProps) => {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );

  try {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          email,
          first_name,
          last_name,
          id,
        },
      ])
      .select();

    console.log("data", data);
    console.log("error", error);

    if (error?.code) return error;
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
