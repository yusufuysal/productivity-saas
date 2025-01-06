"use client";

import NavbarSkeleton from "@/components/NavbarSkeleton";
import SidebarSkeleton from "@/components/SidebarSkeleton";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Sidebar = dynamic(() => import("@/components/Sidebar"), {
  loading: () => <SidebarSkeleton />,
  ssr: false,
});
const Navbar = dynamic(() => import("@/components/Navbar"), {
  loading: () => <NavbarSkeleton />,
  ssr: false,
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full">
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />
        <main className="flex min-w-0 flex-1 items-center gap-20 overflow-x-auto bg-dashboardMainContentColor">
          {children}
        </main>
      </div>
    </div>
  );
}
