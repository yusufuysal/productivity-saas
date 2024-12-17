"use client";

import { createBoardAction } from "@/utils/actions/boards";
import { BoardIcon } from "@/components/svgs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useBoardStore } from "@/store/boardStore";
import DialogForm from "@/components/DialogForm";

const BoardSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters long"),
});

type TBoardSchema = z.infer<typeof BoardSchema>;

export const CreateNewBoard = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const { boards, setBoards, setActiveBoard } = useBoardStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TBoardSchema>({
    resolver: zodResolver(BoardSchema),
  });

  const onSubmit = async (data: TBoardSchema) => {
    //create new board action
    const result = await createBoardAction(data.title);

    if (result?.success && result?.createdBoard) {
      const newBoard = result.createdBoard[0];
      toast.success("Board created successfully!");
      reset();
      setIsOpen(false);
      setBoards([...boards, newBoard]);
      setActiveBoard(newBoard);
      router.push(`/dashboard/boards/${result.slug}`); // Navigate to the new board
    } else {
      toast.error(result?.error || "An unexpected error occurred.");
    }
  };

  const form = (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          <p className="text-destructive">{`${errors.title.message}`}</p>
        )}
      </div>
      <Button
        className="h-[40px] w-full rounded-[20px]"
        variant={"primary"}
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Creating..." : "Create New Board"}
      </Button>
    </form>
  );

  return (
    <DialogForm
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      dialogTriggerContent={
        <>
          {" "}
          <BoardIcon alt="Board Icon" width="16" height="16" />+ Create New
          Board{" "}
        </>
      }
      dialogTitle="Add New Board"
      form={form}
      className="sidebar-button h-[48px] w-[240px] justify-start gap-4 rounded-r-full px-0 py-0 pl-10 text-heading-m font-[500] text-primary md:gap-[13px] lg:w-[276px] lg:gap-[17px]"
    />
  );
};
