"use client";
import { useEffect, useState } from "react";
import { useColumnStore } from "@/store/columnStore";
import { useGetColumns } from "@/utils/hooks/useColumns";
import { Button } from "@/components/ui/button";
import DialogForm from "@/components/DialogForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateColumnsAction } from "@/utils/actions/columns";
import { useBoardStore } from "@/store/boardStore";
import { toast } from "sonner";

const ColumnSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters long"),
});

type TColumnSchema = z.infer<typeof ColumnSchema>;

export default function Dashboard() {
  const { data, isLoading, isError, error } = useGetColumns();
  const { columns, setColumns } = useColumnStore();
  const { activeBoard } = useBoardStore();
  const [isOpen, setIsOpen] = useState(false);

  console.log("columns:  ", columns);

  useEffect(() => {
    if (data) {
      setColumns(data);
    }
  }, [data]);

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
    const newColumns = [
      ...columns,
      { title: data.title, tasks: [], position: columns.length + 1 },
    ];

    const result = await updateColumnsAction(activeBoard?.id, newColumns);

    if (result?.success && result?.updatedColumns) {
      toast.success("Column created successfully!");
      reset();
      setIsOpen(false);
      setColumns(result.updatedColumns);
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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="flex h-full gap-[24px] p-[24px]">
      {columns.map((column) => (
        <div
          key={column.position}
          className="relative flex max-h-[72vh] min-w-[280px] flex-col gap-[12px] rounded-md border-[1px] border-indigo-400 border-opacity-20 p-[8px] pb-0 dark:border-borderColor"
        >
          <p className="sticky top-0 h-[20px] text-left text-heading-s uppercase text-mediumGray">
            {`${column.title} (6)`}
          </p>
          <div className="flex flex-col gap-[20px] overflow-y-auto">
            {column.tasks?.map((task) => (
              <div className="flex h-[88px] w-full cursor-pointer flex-col items-start gap-[8px] rounded-md bg-background px-[16px] py-[23px] hover:bg-bgHover">
                <p className="text-heading-m font-medium text-foreground">
                  {task.title}
                </p>
                <p className="text-body-m text-mediumGray">0 of 3 substasks</p>
              </div>
            ))}
          </div>
          <Button className="sticky bottom-0 left-0 right-0 mx-[-8px] h-[20px] rounded-r-none rounded-t-none bg-dashboardMainContentColor py-[18px] hover:bg-add-new-column-gradient-hover-light dark:hover:bg-add-new-column-gradient-hover-dark">
            + New Item
          </Button>
        </div>
      ))}
      <DialogForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dialogTriggerContent={<Button variant={"ghost"}>+ New Column</Button>}
        dialogTitle="Add New Column"
        form={form}
        className="h-full w-[280px] bg-add-new-column-gradient-light text-heading-xl transition-all duration-300 ease-in-out hover:bg-add-new-column-gradient-hover-light dark:bg-add-new-column-gradient-dark dark:hover:bg-add-new-column-gradient-hover-dark"
      />
    </div>
  );
}
