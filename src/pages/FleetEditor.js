import React from "react";
import { FleetTable } from "../components/fleet-editor/FleetTable";

function FleetEditor() {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-bold tracking-normal lg:text-5xl text-optonygreen mb-4">
        Fleet Editor
      </h1>
      <FleetTable />
    </div>
  );
}

export default FleetEditor;
