"use server";

import { auth } from "@clerk/nextjs/server";
import { createClient } from "../supabase/server";
import { generateSlug } from "../generateSlug";

type Board = {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  slug: string;
};

export async function getBoardsAction(): Promise<{
  data: Board[] | null;
  error: string | null;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { data: null, error: "You must be signed in" };
  }

  const supabase = await createClient();

  try {
    let { data: boards, error } = await supabase
      .from("boards")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return { data: null, error: error.message };
    }
    return { data: boards, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function createBoardAction(title: string): Promise<{
  createdBoard?: Board[] | null;
  success: boolean;
  error: string | null;
  slug?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in" };
  }

  const supabase = await createClient();

  const slug = generateSlug(title);
  const newBoard = {
    user_id: userId,
    title,
    slug,
  };

  try {
    let { data: createdBoard, error } = await supabase
      .from("boards")
      .insert(newBoard)
      .select();

    if (error) {
      return { success: false, error: error.message };
    }
    console.log(createdBoard);
    return { createdBoard, success: true, error: null, slug };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteBoardAction(id: string): Promise<{
  success: boolean;
  error: string | null;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in" };
  }

  const supabase = await createClient();

  try {
    let { error } = await supabase.from("boards").delete().eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function editBoardAction(
  id: string,
  newTitle: string,
): Promise<{
  editedBoard?: Board[] | null;
  success: boolean;
  error: string | null;
  slug?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in" };
  }

  const supabase = await createClient();

  const newSlug = generateSlug(newTitle);

  try {
    let { data: editedBoard, error } = await supabase
      .from("boards")
      .update({ title: newTitle, slug: newSlug })
      .eq("id", id)
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    return { editedBoard, success: true, error: null, slug: newSlug };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
