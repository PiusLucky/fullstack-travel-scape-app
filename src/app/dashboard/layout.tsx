"use client";

import DashboardNavigation from "@/components/common/DashboardNavigation";
import DashboardSidebar from "@/components/common/DashboardSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode, Suspense } from "react";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const layout = (
    <main>
      <Suspense
        fallback={
          <div className="absolute top-0 left-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-purple-700 animate-spin"
            >
              <path d="M12 21a9 9 0 1 1 6.18-15.55a.75.75 0 0 1 0 1.06a.74.74 0 0 1-1.06 0A7.51 7.51 0 1 0 19.5 12a.75.75 0 0 1 1.5 0a9 9 0 0 1-9 9Z" />
            </svg>
          </div>
        }
      >
        <LoadingIndicator />
        <Toaster />
      </Suspense>
      <div className="flex">
        <aside className="hidden md:block">
          <DashboardSidebar />
        </aside>

        <div className="w-full">
          <DashboardNavigation />
          <ScrollArea className="h-[calc(100vh-300px)] md:h-[calc(100vh-100px)] w-full border bg-white flex-grow">
            {children}
          </ScrollArea>
        </div>
      </div>
    </main>
  );

  return layout;
}
