import React from "react";
import { useEffect } from "react";
import useChargerCosts from "../store/useChargerCosts";
import usePhases from "../store/usePhases";
import useAuthStore from "../store/useAuthStore";

const YearOverYear = () => {

  const { phases } = usePhases();


  return (
    <div>
      <h1>Year Over Year Page</h1>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Charger Cost</th>
            {/* <th>Installation Cost</th> */}
            <th>Site</th>
          </tr>
        </thead>
        <tbody>
          {phases &&
            phases.map((item, index) => (
              <tr key={index}>
                <td>{item.year}</td>
                <td>{item.cost}</td>
                {/* <td>{installationCost[index].cost}</td> */}
                <td>{item.site}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default YearOverYear;
