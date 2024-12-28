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

type ConfirmationDialogProps<T> = {
  isOpen: boolean;
  setIsOpen: (newIsOpenValue: boolean) => void;
  onOpen?: () => void;
  dialogTriggerContent: any;
  dialogTitle: string;
  dialogDescription: string;
  confirmText: string;
  confirmAction: (...args: T[]) => Promise<void>; // Generic function type
  confirmArgs?: T[]; // Optional arguments for the confirm action
  className?: string;
};

const ConfirmationDialog = <T,>({
  isOpen,
  setIsOpen,
  onOpen,
  dialogTriggerContent,
  dialogTitle,
  dialogDescription,
  confirmText,
  confirmAction,
  confirmArgs = [],
  className = "w-full hover:bg-dashboardMainContentColor dark:hover:bg-background",
}: ConfirmationDialogProps<T>) => {
  const handleConfirm = async () => {
    await confirmAction(...confirmArgs); // Call the action with arguments
    setIsOpen(false); // Close the dialog after confirmation
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
        if (isOpen && onOpen) {
          onOpen();
        }
      }}
    >
      <DialogTrigger className={className}>
        {dialogTriggerContent}
      </DialogTrigger>
      <DialogContent className="flex w-[343px] flex-col justify-center gap-[24px] border-none bg-background p-[24px] text-foreground md:w-[480px] md:p-[32px]">
        <DialogHeader className="flex flex-col gap-[24px]">
          <DialogTitle className="text-heading-l text-destructive">
            {dialogTitle}
          </DialogTitle>
          <DialogDescription className="text-body-l leading-[23px] text-mediumGray">
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-start gap-[16px] md:flex-row">
          <Button
            className="w-[295px] rounded-full"
            variant={"destructive"}
            onClick={handleConfirm}
          >
            {confirmText}
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
  );
};

export default ConfirmationDialog;
