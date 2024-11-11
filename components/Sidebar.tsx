export default function Sidebar() {
  return (
    <div className="border-borderColor fixed bottom-0 left-0 top-0 hidden min-h-screen border-r-[1px] bg-background md:flex md:w-[261px] md:flex-col md:justify-between lg:w-[300px]">
      <div className="flex flex-col">
        <div className="mt-[32px] flex gap-4 md:ml-[26px] lg:ml-[34px]">
          <span>Logo</span>
          <p>Company Name</p>
        </div>

        <div className="mt-[54px] flex flex-col md:pl-[26px] lg:pl-[34px]">
          <h4 className="h-[34px]">ALL BOARDS (8)</h4>
          <p className="flex h-[48px] w-[214px] items-center lg:w-[242px]">
            Platform Launch
          </p>
          <p className="flex h-[48px] w-[214px] items-center lg:w-[242px]">
            Platform Launch
          </p>
          <p className="flex h-[48px] w-[214px] items-center lg:w-[242px]">
            Platform Launch
          </p>
          <button className="flex h-[48px] w-[214px] items-center lg:w-[242px]">
            + Create New Board
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <span>Light</span>
          <span>Switch</span>
          <span>Dark</span>
        </div>

        <div className="flex justify-start">
          <span>Hide</span>
          <p>Hide Sidebar</p>
        </div>
      </div>
    </div>
  );
}
