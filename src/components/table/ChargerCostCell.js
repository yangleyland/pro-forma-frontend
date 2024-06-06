const ChargerCostCell = ({ getValue }) => {
    const cost = getValue();
    return (
      <div>
        <div className="font-semibold	">{cost}</div>
      </div>
    );
  };
  
  export default ChargerCostCell;