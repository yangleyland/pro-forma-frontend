import { useState, useEffect } from "react";
import useChargerCosts from "../store/useChargerCosts"; // Assuming this hook provides charger data
import useAuthStore from "../store/useAuthStore";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";


const ChargerInfoForm = () => {
  const { chargerCosts } = useChargerCosts(); // Assuming this fetches the charger data for the current user
    const {user}=useAuthStore
  const [formData, setFormData] = useState({
    cost_less_than_10_kw: 0,
    cost_10_20_kw: 0,
    cost_25_kw: 0,
    cost_180_200_kw: 0,
    install_less_than_10_kw:0,
    install_10_20_kw:0,
    install_25_kw:0,
    install_180_200_kw:0,
  });

  useEffect(() => {
    if (chargerCosts) {
      setFormData({
        cost_less_than_10_kw: chargerCosts.cost_less_than_10_kw ?? "",
        cost_10_20_kw: chargerCosts.cost_10_20_kw ?? "",
        cost_25_kw: chargerCosts.cost_25_kw ?? "",
        cost_180_200_kw: chargerCosts.cost_180_200_kw ?? "",
        install_less_than_10_kw: chargerCosts.install_less_than_10_kw ?? "",
        install_10_20_kw: chargerCosts.install_10_20_kw ?? "",
        install_25_kw: chargerCosts.install_25_kw ?? "",
        install_180_200_kw: chargerCosts.install_180_200_kw ?? "",
      });
    }
  }, [chargerCosts]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(chargerCosts)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROUTE}api/chargerdata/patch/${chargerCosts.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      const result = await response.json();
      console.log("Update successful:", result);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <form className="w-1/2" onSubmit={handleSubmit}>
      <div>
        <Label>{"Cost < 10 kw"}</Label>
        <Input
          type="number"
          name="cost_less_than_10_kw"
          value={formData.cost_less_than_10_kw}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label>{"Cost 10-20 kw"}</Label>
        <Input
          type="number"
          name="cost_10_20_kw"
          value={formData.cost_10_20_kw}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label>{"Cost 25 kw"}</Label>
        <Input
          type="number"
          name="cost_25_kw"
          value={formData.cost_25_kw}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label>{"Cost 180-200 kw"}</Label>
        <Input
          type="number"
          name="cost_180_200_kw"
          value={formData.cost_180_200_kw}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label>{"Install Cost <10 kw"}</Label>
        <Input
          type="number"
          name="install_less_than_10_kw"
          value={formData.install_less_than_10_kw}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label>{"Install Cost 10-20 kw"}</Label>
        <Input
          type="number"
          name="install_10_20_kw"
          value={formData.install_10_20_kw}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label>{"Install Cost 25 kw"}</Label>
        <Input
          type="number"
          name="install_25_kw"
          value={formData.install_25_kw}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label>{"Install Cost 180-200 kw"}</Label>
        <Input
          type="number"
          name="install_180_200_kw"
          value={formData.install_180_200_kw}
          onChange={handleInputChange}
        />
      </div>
      <Button className="mt-4" type="submit">Update</Button>
    </form>
  );
};

export default ChargerInfoForm;
