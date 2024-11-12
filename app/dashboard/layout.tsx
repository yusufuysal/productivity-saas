import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <main className="ml-0 flex flex-1 flex-col items-center justify-center gap-6 bg-dashboardMainContentColor px-4 md:ml-[261px] lg:ml-[300px]">
        <div className="flex flex-col items-center justify-center gap-[32px] text-center md:w-[459px] md:gap-[24px] md:px-[48px] lg:w-[493px] lg:px-0">
          {children}
        </div>
      </main>
    </div>
  );
}
