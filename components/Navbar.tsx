"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useBoardStore } from "@/store/boardStore";
import { deleteBoardAction, editBoardAction } from "@/utils/actions/boards";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoreVertical } from "lucide-react";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import ConfirmationDialog from "./ConfirmationDialog";
import FormDialog from "./FormDialog";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const BoardSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

type TBoardSchema = z.infer<typeof BoardSchema>;

const Navbar = () => {
  const router = useRouter();

  const { boards, setBoards, activeBoard, setActiveBoard } = useBoardStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    getValues,
  } = useForm<TBoardSchema>({
    resolver: zodResolver(BoardSchema),
    defaultValues: {
      title: activeBoard?.title || "",
    },
  });

  useEffect(() => {
    if (activeBoard?.title) {
      setValue("title", activeBoard.title); // Dynamically set the title field
    }
  }, [activeBoard, setValue]);

  const onEdit = async (data: TBoardSchema) => {
    //create new board action
    if (!activeBoard) return;

    const result = await editBoardAction(activeBoard.id, data.title);

    if (result?.success && result?.editedBoard) {
      const editedBoard = result.editedBoard[0];
      toast.success("Board edited successfully!");
      reset();
      setIsEditing(false);

      const newBoards = boards.map((board) => {
        if (board.id !== editedBoard.id) return board;

        return { ...board, title: editedBoard.title };
      });
      setBoards(newBoards);

      setActiveBoard(editedBoard);
      router.push(`/dashboard/boards/${result.slug}`); // Navigate to the new board
    } else {
      toast.error(result?.error || "An unexpected error occurred.");
    }
  };

  const editForm = (
    <form
      onSubmit={handleSubmit(onEdit)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // Prevent default form submission behavior
          handleSubmit(onEdit)(); // Trigger the form submission
        }
      }}
      className="flex flex-col gap-[24px]"
    >
      <div className="flex flex-col gap-[12px]">
        <Label
          className="text-heading-m text-mediumGray dark:text-white"
          htmlFor="title"
        >
          Board Title
        </Label>
        <Input
          {...register("title", {
            required: "Title is required",
          })}
          className={cn(
            "border border-mediumGray border-opacity-25 px-[16px] py-[8px] text-body-l",
            {
              "border-destructive": errors.title,
              "focus-visible:ring-destructive": errors.title,
            },
          )}
          id="title"
          placeholder="e.g. Web Design"
        />
        {errors.title && (
          <p className="text-destructive">{errors.title.message}</p>
        )}
      </div>
      <Button
        className="h-[40px] w-full rounded-[20px]"
        variant={"primary"}
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Editing..." : "Edit Board"}
      </Button>
    </form>
  );

  const handleDeleteBoard = async (boardId: string) => {
    const result = await deleteBoardAction(boardId);

    if (result?.success) {
      toast.success("Board deleted successfully!");
      setIsDeleting(false);

      const newBoards = boards.filter((board) => board.id !== boardId);
      setBoards(newBoards);

      setActiveBoard(null);
      router.push("/dashboard");
    }
  };

  return (
    <nav className="flex h-[64px] justify-center border-b-[1px] border-borderColor md:h-[81px]">
      <div className="flex w-full items-center justify-end gap-[18px] p-3 px-5 text-sm">
        <div className="flex items-center">
          {activeBoard && (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-md px-[4px] py-[8px] text-foreground hover:bg-mediumGray hover:bg-opacity-20">
                <MoreVertical />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="mt-[22px] flex w-[170px] flex-col border-[1px] border-borderColor bg-background p-[8px] z-[9999] rounded-lg"
              >
                <DropdownMenuItem
                  className="min-h-[20px] w-full sm:space-x-0 py-0"
                  onSelect={(e) => e.preventDefault()}
                >
                  <FormDialog
                    isOpen={isEditing}
                    setIsOpen={setIsEditing}
                    dialogTriggerContent={
                      <div className="flex items-center gap-2">
                        <Pencil size={16} className="opacity-50" />
                        Edit Board
                      </div>
                    }
                    dialogTitle={"Edit this board?"}
                    form={editForm}
                    className="w-full rounded-md px-[8px] py-[6px] text-start hover:bg-mediumGray hover:bg-opacity-10"
                  />
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="min-h-[20px] w-full sm:space-x-0"
                  onSelect={(e) => e.preventDefault()}
                >
                  <ConfirmationDialog
                    isOpen={isDeleting}
                    setIsOpen={setIsDeleting}
                    dialogTriggerContent={
                      <div className="flex items-center gap-2">
                        <Trash2 size={18} />
                        Delete Board
                      </div>
                    }
                    dialogTitle={"Delete this board?"}
                    dialogDescription={`Are you sure you want to delete the ‘${activeBoard.title}’ board? This action will remove all columns and tasks and cannot be reversed.`}
                    confirmText={"Delete"}
                    confirmAction={() => handleDeleteBoard(activeBoard.id)}
                    className="w-full rounded-md px-[8px] py-[6px] text-start text-destructive hover:bg-red-100 dark:hover:bg-red-950"
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
