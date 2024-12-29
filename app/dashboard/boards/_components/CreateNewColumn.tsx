"use client";

import FormDialog from "@/components/FormDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBoardStore } from "@/store/boardStore";
import { useColumnStore } from "@/store/columnStore";
import { createColumnAction } from "@/utils/actions/columns";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { z } from "zod";

const ColumnSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters long"),
});

type TColumnSchema = z.infer<typeof ColumnSchema>;

export default function CreateNewColumn() {
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
      dialogTriggerContent={
        <span
          role="button"
          className="hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-heading-l font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          + New Column
        </span>
      }
      dialogTitle="Add New Column"
      form={newColumnForm}
      className="h-full w-[280px] rounded-md bg-add-new-column-gradient-light text-heading-xl transition-all duration-300 ease-in-out hover:bg-add-new-column-gradient-hover-light dark:bg-add-new-column-gradient-dark dark:hover:bg-add-new-column-gradient-hover-dark"
    />
  );
}
