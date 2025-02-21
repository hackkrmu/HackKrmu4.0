import React from "react";
import LandingPage from "./Landing/LandingPage";
import Dashboard1 from "./Landing/Dashboard1";
import DashboardLog from "./Landing/DashboardLog";
import Dashboard2 from "./Landing/Dashboard2";
import Dashboard3 from "./Landing/Dashboard3";


const page = () => {
  return (
    <div>
      <LandingPage />
      <Dashboard1 />
      <Dashboard2 />
      <Dashboard3 />
      <DashboardLog/>
    </div>
  );
};

export default page;
