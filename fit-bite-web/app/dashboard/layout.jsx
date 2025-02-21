"use client";

import { useSidebar } from "../Context/SidebarContext";
import AppHeader from "../components/AppHeader";
import AppSidebar from "../components/AppSidebar";
import Backdrop from "../components/Backdrop";
import React from "react";

export default function AdminLayout({
  children,
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  console.log({AppSidebar});
  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex bg-black-400">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-screen-2xl md:p-6">{children}</div>
      </div>
    </div>
  );
}
