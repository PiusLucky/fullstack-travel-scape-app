import React from "react";

import OverviewChartSection from "@/components/sections/OverviewChartSection";
import OverviewStatisticSection from "@/components/sections/OverviewStatisticSection";
import { OrderTable } from "@/components/tables/OrderTable";

function Overview() {
  return (
    <div className="flex flex-col gap-16 mt-[4rem] mx-4 md:mx-8">
      <OverviewStatisticSection />
      <OverviewChartSection />
      <OrderTable />
    </div>
  );
}

export default Overview;
