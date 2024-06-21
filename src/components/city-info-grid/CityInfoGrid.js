import { useState, useEffect } from "react";
import useCityInfo from "../../store/useCityInfo";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const CityInfoForm = () => {
  const { cityInfo } = useCityInfo();

  const [formData, setFormData] = useState({
    city_name: "",
    city_image: "",
    cost_benefit_min: null,
    cost_benefit_max: null,
    cost_savings_max: null,
  });

  useEffect(() => {
    if (cityInfo) {
      setFormData({
        city_name: cityInfo.city_name ?? "",
        city_image: cityInfo.city_image ?? "",
        cost_benefit_min: cityInfo.cost_benefit_min ?? null,
        cost_benefit_max: cityInfo.cost_benefit_max ?? null,
        cost_savings_max: cityInfo.cost_savings_max ?? null,
      });
    }
  }, [cityInfo]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === '' ? null : value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = cityInfo.id; // Assuming userId is available in cityInfo
    console.log(formData)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROUTE}api/city-info/patch/${userId}`,
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
        <Label>City Name:</Label>
        <Input
          type="text"
          name="city_name"
          value={formData.city_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label>City Image URL:</Label>
        <Input
          type="text"
          name="city_image"
          value={formData.city_image}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label>Cost Benefit Graph Min:</Label>
        <Input
          type="number"
          name="cost_benefit_min"
          value={formData.cost_benefit_min}
          onChange={handleNumChange}
        />
      </div>
      <div>
        <Label>Cost Benefit Graph Max:</Label>
        <Input
          type="number"
          name="cost_benefit_max"
          value={formData.cost_benefit_max}
          onChange={handleNumChange}
        />
      </div>
      <div>
        <Label>Savings Graph Max:</Label>
        <Input
          type="number"
          name="cost_savings_max"
          value={formData.cost_savings_max}
          onChange={handleNumChange}
        />
      </div>
      <Button className="mt-4"  type="submit">Update</Button>
    </form>
  );
};

export default CityInfoForm;
