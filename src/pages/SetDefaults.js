import React from "react";
import { Button } from "../components/ui/button";
import useAuthStore from "../store/useAuthStore";

function SetDefaults() {
  const { user } = useAuthStore();

  const saveDefault = async (tableName) => {
    if (!user) {return;}
    const userId = user.id; // Assume user object has an id property

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROUTE}api/save-default?userId=${userId}&tableName=${tableName}`,
        {
          method: 'GET', // Use GET method
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save defaults');
      }

      const data = await response.json();
      console.log('Defaults saved:', data);
    } catch (error) {
      console.error('Error saving defaults:', error);
    }
  };

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-bold tracking-normal lg:text-5xl text-optonygreen mb-4">
        Set Defaults
      </h1>
      <div className="flex flex-col gap-2 w-60">
        <Button className="relative top-2" onClick={() => saveDefault('fleet data')}>
          Save Default Fleet
        </Button>
        <Button className="relative top-2" onClick={() => saveDefault('phases')}>
          Save Default Phases
        </Button>
        <Button className="relative top-2" onClick={() => saveDefault('advanced controls')}>
          Save Default Advanced Controls
        </Button>
      </div>
    </div>
  );
}

export default SetDefaults;
