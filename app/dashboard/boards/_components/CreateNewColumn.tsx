"use client";

import { createColumnAction } from "@/utils/actions/columns";
import { useColumnStore } from "@/store/columnStore";
import { useBoardStore } from "@/store/boardStore";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormDialog from "@/components/FormDialog";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { v4 as uuid } from "uuid";

const ColumnSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters long"),
});

type TColumnSchema = z.infer<typeof ColumnSchema>;

export const CreateNewColumn = () => {
  const { columns, setColumns } = useColumnStore();
  const { activeBoard } = useBoardStore();

  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TColumnSchema>({
    resolver: zodResolver(ColumnSchema),
  });

  const onSubmit = async (data: TColumnSchema) => {
    //create new column action
    const newUuid = uuid();

    const newColumn = {
      id: newUuid,
      title: data.title,
      tasks: [],
      position: columns.length + 1,
    };

    const result = await createColumnAction(activeBoard?.id, newColumn);

    if (result?.success && result?.updatedColumns) {
      toast.success("Column created successfully!");
      reset();
      setIsOpen(false);
      setColumns(result.updatedColumns);
    } else {
      toast.error(result?.error || "An unexpected error occurred.");
    }
  };

  const newColumnForm = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[24px]"
    >
      <div className="flex flex-col gap-[12px]">
        <Label
          className="text-heading-m text-mediumGray dark:text-white"
          htmlFor="title"
        >
          Column Title
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
        {isSubmitting ? "Creating..." : "Create New Column"}
      </Button>
    </form>
  );

  return (
    <FormDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      dialogTriggerContent={<Button variant={"ghost"}>+ New Column</Button>}
      dialogTitle="Add New Column"
      form={newColumnForm}
      className="h-full w-[280px] rounded-md bg-add-new-column-gradient-light text-heading-xl transition-all duration-300 ease-in-out hover:bg-add-new-column-gradient-hover-light dark:bg-add-new-column-gradient-dark dark:hover:bg-add-new-column-gradient-hover-dark"
    />
  );
};
