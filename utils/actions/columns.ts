"use server";

import { Column } from "@/types";
import { auth } from "@clerk/nextjs/server";

import { createClient } from "../supabase/server";

export async function getColumnsAction(
  activeBoardId: string | undefined,
): Promise<{
  data: Column[] | null;
  error: string | null;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { data: null, error: "You must be signed in" };
  }

  const supabase = await createClient();

  try {
    let { data, error } = await supabase
      .from("boards")
      .select("columns")
      .eq("id", activeBoardId);

    if (error) {
      return { data: null, error: error.message };
    }

    // Extract and validate the columns field
    const columns = data?.[0]?.columns as Column[] | undefined;

    if (!columns) {
      return { data: null, error: "No columns found for the board" };
    }

    return { data: columns, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function createColumnAction(
  activeBoardId: string | undefined,
  newColumn: Column,
): Promise<{
  updatedColumns?: Column[] | null;
  success: boolean;
  error: string | null;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in" };
  }

  const supabase = await createClient();

  try {
    let { data, error } = await supabase.rpc("add_column", {
      board_id: activeBoardId,
      new_column: newColumn,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data) {
      return { success: false, error: null };
    }
    return { updatedColumns: data[0].columns, success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteColumnAction(
  activeBoardId: string | undefined,
  columnId: string,
): Promise<{
  updatedColumns?: Column[] | null;
  success: boolean;
  error: string | null;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in" };
  }

  const supabase = await createClient();

  console.log({ activeBoardId });
  console.log({ columnId });

  try {
    let { data, error } = await supabase.rpc("delete_column", {
      board_id: activeBoardId,
      column_id: columnId,
    });

    console.log("delete action data: ", data);

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data) {
      return { success: false, error: null };
    }
    return { updatedColumns: data[0].columns, success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateColumnAction(
  activeBoardId: string | undefined,
  updatedColumn: Column,
): Promise<{
  updatedColumns?: Column[] | null;
  success: boolean;
  error: string | null;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in" };
  }

  const supabase = await createClient();

  try {
    let { data, error } = await supabase.rpc("update_column", {
      board_id: activeBoardId,
      updated_column: updatedColumn,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data) {
      return { success: false, error: null };
    }
    return { updatedColumns: data[0].columns, success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function reorderColumnsAction(
  activeBoardId: string | undefined,
  reorderedColumns: Column[],
): Promise<{
  updatedColumns?: Column[] | null;
  success: boolean;
  error: string | null;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in" };
  }

  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("boards")
      .update({ columns: reorderedColumns })
      .eq("id", activeBoardId)
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data) {
      return { success: false, error: null };
    }

    return { updatedColumns: data[0].columns, success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
