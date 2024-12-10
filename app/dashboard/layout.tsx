import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-full w-full">
      <Sidebar />
      <div className="ml-0 flex flex-1 flex-col items-center justify-center gap-6 bg-dashboardMainContentColor md:ml-[261px] lg:ml-[300px]">
        <div className="flex h-full w-full flex-col items-center justify-center gap-[32px] bg-dashboardMainContentColor text-center md:gap-[24px] md:px-[48px] lg:px-0">
          {children}
        </div>
      </div>
    </section>
  );
}
