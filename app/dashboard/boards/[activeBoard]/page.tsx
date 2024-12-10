"use client";
import { Button } from "@/components/ui/button";
import { useBoardStore } from "@/store/boardStore";

export default function Dashboard() {
  const { activeBoard } = useBoardStore();

  return (
    <div className="flex h-full w-full gap-[24px] p-[24px]">
      {activeBoard?.columns &&
        activeBoard.columns.map((column) => (
          <div
            key={column.position}
            className="relative flex max-h-[72vh] w-[280px] flex-col gap-[24px] rounded-md border-[1px] border-indigo-400 border-opacity-20 p-[8px] dark:border-borderColor"
          >
            <p className="sticky top-0 h-[20px] text-left text-heading-s uppercase text-mediumGray">
              {`${column.title} (6)`}
            </p>
            <div className="flex flex-col gap-[20px] overflow-y-auto">
              <div className="hover:bg-bgHover flex h-[88px] w-full cursor-pointer flex-col items-start gap-[8px] rounded-md bg-background px-[16px] py-[23px]">
                <p className="text-heading-m font-medium text-foreground">
                  Build UI for onboarding flow
                </p>
                <p className="text-body-m text-mediumGray">0 of 3 substasks</p>
              </div>
              <div className="flex h-[88px] w-full flex-col items-start gap-[8px] rounded-md bg-background px-[16px] py-[23px]">
                <p className="text-heading-m font-medium text-foreground">
                  Build UI for onboarding flow
                </p>
                <p className="text-body-m text-mediumGray">0 of 3 substasks</p>
              </div>

              <div className="flex h-[88px] w-full flex-col items-start gap-[8px] rounded-md bg-background px-[16px] py-[23px]">
                <p className="text-heading-m font-medium text-foreground">
                  Build UI for onboarding flow
                </p>
                <p className="text-body-m text-mediumGray">0 of 3 substasks</p>
              </div>
              <div className="flex h-[88px] w-full flex-col items-start gap-[8px] rounded-md bg-background px-[16px] py-[23px]">
                <p className="text-heading-m font-medium text-foreground">
                  Build UI for onboarding flow
                </p>
                <p className="text-body-m text-mediumGray">0 of 3 substasks</p>
              </div>
              <div className="flex h-[88px] w-full flex-col items-start gap-[8px] rounded-md bg-background px-[16px] py-[23px]">
                <p className="text-heading-m font-medium text-foreground">
                  Build UI for onboarding flow
                </p>
                <p className="text-body-m text-mediumGray">0 of 3 substasks</p>
              </div>
              <div className="flex w-full flex-col items-start gap-[8px] rounded-md bg-background px-[16px] py-[23px]">
                <p className="text-left text-heading-m font-medium text-foreground">
                  QA and test all major user journeys
                </p>
                <p className="text-body-m text-mediumGray">0 of 2 substasks</p>
              </div>
            </div>
            <Button className="sticky bottom-0 left-0 right-0 mx-[-8px] h-[20px] rounded-r-none rounded-t-none bg-dashboardMainContentColor py-4 hover:bg-add-new-column-gradient-hover-light dark:hover:bg-add-new-column-gradient-hover-dark">
              + New Item
            </Button>
          </div>
        ))}
      <Button
        variant={"ghost"}
        className="h-full w-[280px] bg-add-new-column-gradient-light text-heading-xl transition-all duration-300 ease-in-out hover:bg-add-new-column-gradient-hover-light dark:bg-add-new-column-gradient-dark dark:hover:bg-add-new-column-gradient-hover-dark"
      >
        + New Column
      </Button>
    </div>
  );
}
