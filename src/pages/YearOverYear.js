import React from "react";
import useAuthStore from "../store/useAuthStore";
import DemoPage from "../components/year-year-table/DemoPage";


const YearOverYear = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <div>Please log in</div>;
  }
  return (
    <div>
     
      <h1 className="scroll-m-20 text-4xl font-bold tracking-normal lg:text-5xl text-optonygreen mb-4">
        Year-Over-Year
      </h1>
      <DemoPage />
    </div>
  );
};

export default YearOverYear;
