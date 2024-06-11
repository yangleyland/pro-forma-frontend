const ChargerCostCell = ({ getValue }) => {
  const formatValue = (value) => {
    const amount = parseFloat(value);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
    return value;
  };
  const cost = getValue();
  return (
    <div>
      <div className="font-semibold	">{formatValue(cost)}</div>
    </div>
  );
};

export default ChargerCostCell;
