import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />
        <main className="flex min-w-0 flex-1 items-center gap-20 overflow-x-auto bg-dashboardMainContentColor">
          {children}
        </main>
      </div>
    </div>
  );
}
