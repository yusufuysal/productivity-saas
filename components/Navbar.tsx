"use client";

import { useBoardStore } from "@/store/boardStore";
import { deleteBoardAction, editBoardAction } from "@/utils/actions/boards";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
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

  const onSubmit = async (data: TBoardSchema) => {
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

  return (
    <nav className="flex h-[64px] w-full justify-center border-b-[1px] border-borderColor md:h-[81px]">
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
                <DropdownMenuTrigger>three dots</DropdownMenuTrigger>
                <DropdownMenuContent className="mt-[22px] flex h-[94px] w-[192px] flex-col justify-center gap-[16px] border-none bg-white px-0 dark:bg-dashboardMainContentColor">
                  <DropdownMenuItem
                    className="h-[23px] px-0 sm:space-x-0"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Dialog open={isEditing} onOpenChange={setIsEditing}>
                      <DialogTrigger className="w-full hover:bg-dashboardMainContentColor dark:hover:bg-background">
                        Edit Board
                      </DialogTrigger>
                      <DialogContent className="flex w-[343px] flex-col justify-center gap-[24px] border-none bg-background p-[24px] text-foreground md:w-[480px] md:p-[32px]">
                        <DialogHeader className="flex flex-col gap-[24px]">
                          <DialogTitle className="text-heading-l text-destructive">
                            Edit this board?
                          </DialogTitle>
                          <DialogDescription className="text-body-l leading-[23px] text-mediumGray">
                            {`Are you sure you want to edit the ‘${activeBoard.title}’
                        board? This action will remove all columns and tasks and
                        cannot be reversed.`}
                          </DialogDescription>
                        </DialogHeader>
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault(); // Prevent default form submission behavior
                              handleSubmit(onSubmit)(); // Trigger the form submission
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
                                  "focus-visible:ring-destructive":
                                    errors.title,
                                },
                              )}
                              id="title"
                              placeholder="e.g. Web Design"
                            />
                            {errors.title && (
                              <p className="text-destructive">
                                {errors.title.message}
                              </p>
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
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="h-[23px] px-0 sm:space-x-0"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
                      <DialogTrigger className="w-full hover:bg-dashboardMainContentColor dark:hover:bg-background">
                        Delete Board
                      </DialogTrigger>
                      <DialogContent className="p-[24 px] flex w-[343px] flex-col gap-[24px] border-none md:w-[480px] md:p-[32px] md:pb-[40px]">
                        <DialogHeader className="flex flex-col gap-[24px]">
                          <DialogTitle className="text-heading-l text-destructive">
                            Delete this board?
                          </DialogTitle>
                          <DialogDescription className="text-body-l leading-[23px] text-mediumGray">
                            {`Are you sure you want to delete the ‘${activeBoard.title}’
                        board? This action will remove all columns and tasks and
                        cannot be reversed.`}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-start gap-[16px] md:flex-row">
                          <Button
                            className="w-[295px] rounded-full"
                            variant={"destructive"}
                            onClick={async () => {
                              const result = await deleteBoardAction(
                                activeBoard?.id,
                              );

                              if (result?.success) {
                                toast.success("Board deleted successfully!");
                                setIsDeleting(false);

                                const newBoards = boards.filter(
                                  (board) => board.id !== activeBoard?.id,
                                );
                                setBoards(newBoards);

                                setActiveBoard(null);
                                router.push("/dashboard");
                              }
                            }}
                          >
                            Delete
                          </Button>
                          <DialogClose asChild>
                            <Button
                              className="ml-0 w-[295px] rounded-full"
                              variant={"secondary"}
                            >
                              Cancel
                            </Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
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
