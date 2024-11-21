"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { createNewBoardAction } from "@/app/actions";
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

const newBoardSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

type TNewBoardSchema = z.infer<typeof newBoardSchema>;

export const CreateNewBoard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<TNewBoardSchema>({
    resolver: zodResolver(newBoardSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: TNewBoardSchema) => {
    //create new board action
    const result = await createNewBoardAction(data.title);

    if (result?.success) {
      toast.success("Board created successfully!");
      reset();
      setIsOpen(false);
      router.push(`/dashboard/boards/${result.slug}`); // Navigate to the new board
    } else {
      toast.error(result?.error || "An unexpected error occurred.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="sidebar-button h-[48px] w-[240px] justify-start gap-4 rounded-r-full px-0 py-0 pl-10 text-heading-m font-[500] text-primary md:gap-[13px] lg:w-[276px] lg:gap-[17px]">
        {" "}
        <BoardIcon alt="Board Icon" width="16" height="16" />+ Create New Board
      </DialogTrigger>
      <DialogContent className="flex w-[343px] flex-col justify-center gap-[24px] border-none bg-background p-[24px] text-foreground md:w-[480px] md:p-[32px]">
        <DialogHeader>
          <DialogTitle className="text-left text-heading-l">
            Add New Board
          </DialogTitle>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
};
