"use client";

import { useBoardStore } from "@/store/boardStore";
import { deleteBoardAction } from "@/utils/actions/boards";

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
import { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const { boards, setBoards, activeBoard, setActiveBoard } = useBoardStore();
  const [isOpen, setIsOpen] = useState(false);

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
            <DropdownMenu>
              <DropdownMenuTrigger>three dots</DropdownMenuTrigger>
              <DropdownMenuContent className="mt-[22px] flex h-[94px] w-[192px] flex-col justify-center gap-[16px] border-none bg-white px-0 dark:bg-dashboardMainContentColor">
                <DropdownMenuItem
                  className="h-[23px] px-0 sm:space-x-0"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Dialog>
                    <DialogTrigger className="w-full hover:bg-dashboardMainContentColor dark:hover:bg-background">
                      Edit Board
                    </DialogTrigger>
                    <DialogContent className="p-[24 px] flex w-[343px] flex-col gap-[24px] border-none md:w-[480px] md:p-[32px] md:pb-[40px]">
                      <DialogHeader className="flex flex-col gap-[24px]">
                        <DialogTitle className="text-heading-l text-destructive">
                          Edit this board?
                        </DialogTitle>
                        <DialogDescription className="text-body-l leading-[23px] text-mediumGray">
                          {`Are you sure you want to delete the ‘${""}’
                        board? This action will remove all columns and tasks and
                        cannot be reversed.`}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col items-start gap-[16px] md:flex-row">
                        <Button
                          type="button"
                          className="w-[295px] rounded-full"
                          variant={"destructive"}
                          onClick={() => console.log("delete btn is clicked")}
                        >
                          Save
                        </Button>
                        <Button
                          className="ml-0 w-[295px] rounded-full"
                          variant={"secondary"}
                        >
                          Cancel
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="h-[23px] px-0 sm:space-x-0"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger className="w-full hover:bg-dashboardMainContentColor dark:hover:bg-background">
                      Delete Board
                    </DialogTrigger>
                    <DialogContent className="p-[24 px] flex w-[343px] flex-col gap-[24px] border-none md:w-[480px] md:p-[32px] md:pb-[40px]">
                      <DialogHeader className="flex flex-col gap-[24px]">
                        <DialogTitle className="text-heading-l text-destructive">
                          Delete this board?
                        </DialogTitle>
                        <DialogDescription className="text-body-l leading-[23px] text-mediumGray">
                          {`Are you sure you want to delete the ‘${activeBoard?.title}’
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
                              setIsOpen(false);

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
