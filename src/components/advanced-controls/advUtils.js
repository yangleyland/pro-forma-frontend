
export const updateAdvancedControl = async (id, updatePayload,setAdvancedCalcs) => {
    try {
      console.log(updatePayload)
      const response = await fetch(
        `${process.env.REACT_APP_API_ROUTE}api/advancedcontrols/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, ...updatePayload }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update advanced control");
      }

      const data = await response.json();
      console.log("Update successful:", data[0]);
      setAdvancedCalcs(data[0]);
    } catch (error) {
      console.error("Error updating advanced control:", error);
      throw error;
    }
  };
