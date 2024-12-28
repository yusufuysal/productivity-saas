import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import DialogForm from "@/components/FormDialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { updateColumnAction } from "@/utils/actions/columns";
import { useColumnStore } from "@/store/columnStore";
import { useBoardStore } from "@/store/boardStore";

import { Task } from "@/types";
import { v4 as uuid } from "uuid";

const TaskSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters long"),
  subtasks: z.array(
    z.object({
      title: z.string(),
      completed: z.boolean().default(false),
    }),
  ),
});

type TTaskSchema = z.infer<typeof TaskSchema>;

export const CreateNewTask = ({ position }: { position: number }) => {
  const { columns, setColumns } = useColumnStore();
  const { activeBoard } = useBoardStore();

  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TTaskSchema>({
    resolver: zodResolver(TaskSchema),
    defaultValues: { subtasks: [{ title: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const onSubmit = async (data: TTaskSchema) => {
    const selectedColumn = columns.find(
      (column) => column.position === position,
    );

    if (!selectedColumn) {
      return;
    }

    // Create the new task
    const newTask: Task = {
      id: uuid(),
      title: data.title,
      position: selectedColumn.tasks.length + 1,
      subtasks:
        data.subtasks?.map((subtask) => ({
          id: uuid(),
          title: subtask.title,
          completed: subtask.completed,
        })) || [],
    };

    const updatedColumn = {
      ...selectedColumn,
      tasks: [...selectedColumn.tasks, newTask],
    };

    const result = await updateColumnAction(activeBoard?.id, updatedColumn);

    if (result?.success && result?.updatedColumns) {
      toast.success("Task created successfully!");
      reset();
      setIsOpen(false);
      setColumns(result.updatedColumns);
    } else {
      toast.error(result?.error || "An unexpected error occurred.");
    }
  };

  const newTaskForm = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[24px]"
    >
      {/* Task Title */}
      <div className="flex flex-col gap-[12px]">
        <Label
          className="text-heading-m text-mediumGray dark:text-white"
          htmlFor="title"
        >
          Task Title
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

      {/* Subtasks */}
      <div className="flex flex-col gap-[12px]">
        <Label
          className="text-heading-m text-mediumGray dark:text-white"
          htmlFor="subtasks"
        >
          Subtasks
        </Label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <Input
              {...register(`subtasks.${index}.title` as const, {
                required: "Subtask title is required",
              })}
              placeholder={`Subtask ${index + 1}`}
              className={cn(
                "border border-mediumGray border-opacity-25 px-[16px] py-[8px] text-body-l",
                {
                  "border-destructive":
                    errors.subtasks && errors.subtasks[index]?.title,
                  "focus-visible:ring-destructive":
                    errors.subtasks && errors.subtasks[index]?.title,
                },
              )}
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => remove(index)}
            >
              ✕
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="mt-2 w-full rounded-[20px]"
          onClick={() => append({ title: "", completed: false })}
        >
          + Add Subtask
        </Button>
      </div>

      {/* Submit Button */}
      <Button
        className="h-[40px] w-full rounded-[20px]"
        variant={"primary"}
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Creating..." : "Create New Task"}
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
          <span className="pb-[4px] text-lg">+</span>
          <span>Add Task</span>
        </>
      }
      dialogTitle="Add New Task"
      form={newTaskForm}
      className="sticky bottom-0 left-0 right-0 mx-[-8px] flex min-h-[88px] items-center justify-start gap-[12px] bg-dashboardMainContentColor pl-[24px] hover:bg-add-new-column-gradient-hover-light dark:hover:bg-add-new-column-gradient-hover-dark"
    />
  );
};
