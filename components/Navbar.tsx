"use client";

import { useBoardStore } from "@/store/boardStore";
import { deleteBoardAction, editBoardAction } from "@/utils/actions/boards";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HorizontalDotsIcon } from "./svgs";
import FormDialog from "./FormDialog";
import ConfirmationDialog from "./ConfirmationDialog";

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
      <div className="flex w-full items-center justify-end gap-8 p-3 px-5 text-sm">
        <div className="flex items-center gap-2">
          <Button
            className="flex justify-center gap-1 rounded-full"
            variant={"primary"}
          >
            +
            <span className="hidden md:inline md:text-heading-m">
              Add New Task
            </span>
          </Button>
          {activeBoard && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-md px-[4px] py-[8px] text-foreground opacity-70 hover:bg-mediumGray hover:bg-opacity-20">
                  <HorizontalDotsIcon
                    alt="Options"
                    width={16}
                    height={16}
                    style={{
                      transform: "rotate(90deg)",
                      transformOrigin: "center",
                    }}
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="mt-[22px] flex h-[90px] w-[170px] flex-col items-start justify-center gap-[14px] border-none bg-background px-0">
                  <DropdownMenuItem
                    className="mx-[8px] h-[20px] w-[160px] sm:space-x-0"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <FormDialog
                      isOpen={isEditing}
                      setIsOpen={setIsEditing}
                      dialogTriggerContent={"Edit Board"}
                      dialogTitle={"Edit this board?"}
                      form={editForm}
                      className="w-full rounded-md px-[8px] py-[6px] text-start hover:bg-mediumGray hover:bg-opacity-10"
                    />
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="mx-[8px] h-[20px] w-[160px] sm:space-x-0"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <ConfirmationDialog
                      isOpen={isDeleting}
                      setIsOpen={setIsDeleting}
                      dialogTriggerContent={"Delete Board"}
                      dialogTitle={"Delete this board?"}
                      dialogDescription={`Are you sure you want to delete the ‘${activeBoard.title}’ board? This action will remove all columns and tasks and cannot be reversed.`}
                      confirmText={"Delete"}
                      confirmAction={() => handleDeleteBoard(activeBoard.id)}
                      className="w-full rounded-md px-[8px] py-[6px] text-start hover:bg-mediumGray hover:bg-opacity-10"
                    />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
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
