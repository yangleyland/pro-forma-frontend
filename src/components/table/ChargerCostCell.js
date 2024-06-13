const ChargerCostCell = ({ getValue }) => {
  const formatValue = (value) => {
    const amount = parseFloat(value);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const cost = getValue() || 0; // This keeps the value as a number
  
  const formattedCost = formatValue(cost); // This formats the value for display

  return (
    <div>
      <div className="font-semibold">{formattedCost}</div>
    </div>
  );
};

export default ChargerCostCell;
