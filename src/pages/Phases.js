import React from "react";
import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import usePhases from "../store/usePhases";
import useChargerCosts from "../store/useChargerCosts";

function Phases() {
  const { user } = useAuthStore();
  const { phases, fetchPhases } = usePhases();
  const { chargerCosts, installationCosts, setChargerCost, setInstallCost } =
    useChargerCosts();

  // Define initial state values
  const [site, setSite] = useState("");
  const [year, setYear] = useState("");
  const [ports, setPorts] = useState("");

  // Sort phases by year
  const sortedPhases = [...phases].sort((a, b) => a.year - b.year);

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "site") {
      setSite(value);
    } else if (name === "year") {
      setYear(value);
    } else if (name === "ports") {
      setPorts(value);
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any validation or data processing here
    // Then, call the API to add the phase
    const newPhase = {
      site: site,
      year: year,
      ports: ports,
      user_id: user.id,
    };
    fetch(`http://localhost:3002/api/phases/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPhase),
    })
      .then((response) => response.json())
      .then((data) => {
        // Reset the form inputs
        setSite("");
        setYear("");
        setPorts("");
        fetchPhases(user.id);
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  };
  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Phases Page</h1>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Site</th>
            <th>Ports</th>
            <th>Charger Purchase Cost</th>
            <th>Installation Cost</th>
          </tr>
        </thead>
        <tbody>
          {phases &&
            sortedPhases.map((phase) => (
              <tr key={phase.id}>
                <td>{phase.year}</td>
                <td>{phase.site}</td>
                <td>{phase.ports}</td>
                <td>{phase.cost}</td>
                <td>{phase.installCost}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="site"
          placeholder="Site"
          value={site}
          onChange={handleChange}
        />
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={year}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ports"
          placeholder="Ports"
          value={ports}
          onChange={handleChange}
        />
        <button type="submit">Add Phase</button>
      </form>
    </div>
  );
}

export default Phases;
