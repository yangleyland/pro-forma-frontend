// src/pages/Dashboard.js
import React, { useEffect } from "react";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useAllSitesCalcs from "../store/useAllSitesCalcs";
import useAllSitesYearOverYear from "../store/useAllSitesYearOverYear";
import Controls from "../components/dashboard/Controls";
import CostBenefitChart from "../components/dashboard/CostBenefitChart";
import CostAndSavings from "../components/dashboard/CostAndSavings";
import GHGReductionsGraph from "../components/dashboard/GHGReductionsGraph";
import GHGReductions from "../components/dashboard/GHGReductions";
import Timeline from "../components/dashboard/Timeline";

import ElectrificationScenario from "../components/dashboard/ElectrificationScenario";
import PrioritySite from "../components/PrioritySite";
import CashFlow from "../components/dashboard/CashFlow";
import CapitalCostsGraph from "../components/dashboard/CapitalCostsGraph";
import useCityInfo from "../store/useCityInfo";
import {Card, CardContent} from "../components/ui/card";

function Dashboard() {
  const { user, fetchData } = useAuthStore();
  const [renderKey, setRenderKey] = useState(0);
  const { cityInfo } = useCityInfo();
  console.log(cityInfo);

  useEffect(() => {
    if (user) {
      fetchData(user.id);
    }
  }, [fetchData, user]);

  return (
    <div>
      <div className="flex justify-between pr-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-normal lg:text-5xl text-optonygreen mb-2">
          Dashboard
        </h1>
        {(cityInfo && cityInfo.city_image) && <img src={cityInfo.city_image} alt="city" className="h-12 rounded-sm" />}
      </div>

      <p className="text-gray-400 text-lg">
        Welcome, {cityInfo && cityInfo.city_name}
      </p>

      <div className="grid grid-cols-6 md:grid-cols-12 gap-4 p-4">
        <div className="col-span-3 h-fill">
          <Controls />
        </div>
        <div className="col-span-5 row-span-1 h-fill">
          <CostBenefitChart />
        </div>
        <div className="col-span-4  row-span-1 h-fill">
          <CostAndSavings key={renderKey} />
        </div>

        <div className="col-span-3 row-span-1 h-fill">
          <PrioritySite />
        </div>
        <div className="col-span-3  row-span-1 h-fill">
          <ElectrificationScenario />
        </div>
        <div className="col-span-3  row-span-1 h-fill">
          <GHGReductions />
        </div>
        <div className="col-span-3  row-span-1 h-fill">
          <CashFlow />
        </div>
        <div className="col-span-4 row-span-1 h-full">
          <GHGReductionsGraph />
        </div>
        <div className="col-span-4 row-span-1 h-full">
          <CapitalCostsGraph />
        </div>
        <div className="col-span-4 row-span-1 h-full">
          <Timeline />
        </div>
        {/* <div className="col-span-3 row-span-1 flex gap-4 flex-col h-full justify-between">
          <GHGReductions />
          <PrioritySite />
        </div>

        <div className="col-span-3 row-span-1 flex gap-4 flex-col h-full justify-between">
          <ElectrificationScenario />
          <CashFlow />
        </div> */}
      </div>

      {/* <Calculations /> */}
    </div>
  );
}

export default Dashboard;
