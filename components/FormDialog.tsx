import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const FormDialog = ({
  isOpen,
  setIsOpen,
  dialogTriggerContent,
  dialogTitle,
  form,
  className,
}: {
  isOpen: boolean;
  setIsOpen: (newIsOpenValue: boolean) => void;
  dialogTriggerContent: any;
  dialogTitle: string;
  form: JSX.Element;
  className?: string;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={className}>
        {dialogTriggerContent}
      </DialogTrigger>
      <DialogContent className="flex w-[343px] flex-col justify-center gap-[24px] border-none bg-background p-[24px] text-foreground md:w-[480px] md:p-[32px]">
        <DialogHeader>
          <DialogTitle className="text-left text-heading-l">
            {dialogTitle}
          </DialogTitle>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
