"use client"

import React from "react";
import EcommerceMetrics from "../components/EcommerceMetrics";
import MonthlyTarget from "../components/Ecommerce/MonthlyTarget";
import MonthlySalesChart from "../components/Ecommerce/MonthlySalesChart";
import StatisticsChart from "../components/Ecommerce/StatisticsChart";
import RecentOrders from "../components/Ecommerce/RecentOrders";
import DemographicCard from "../components/Ecommerce/DemographicCard";

// export const metadata = {
//   title:
//     "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
//   description: "This is Next.js Home for TailAdmin Dashboard Template",
// };

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
    </div>
  );
}
