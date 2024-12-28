import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const FormDialog = ({
  isOpen,
  setIsOpen,
  onOpen,
  dialogTriggerContent,
  dialogTitle,
  dialogDescription,
  form,
  className,
}: {
  isOpen: boolean;
  setIsOpen: (newIsOpenValue: boolean) => void;
  onOpen?: () => void;
  dialogTriggerContent: any;
  dialogTitle: string;
  dialogDescription?: string;
  form: JSX.Element;
  className?: string;
}) => {
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
        <DialogHeader>
          <DialogTitle className="text-left text-heading-l">
            {dialogTitle}
          </DialogTitle>

          {dialogDescription && (
            <DialogDescription className="text-left text-body-l text-mediumGray">
              {dialogDescription}
            </DialogDescription>
          )}
        </DialogHeader>

        {form}
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
