const ChargerCostCell = ({ getValue }) => {
    const cost = getValue();
    return (
      <div>
        <div>{cost}</div>
      </div>
    );
  };
  
  export default ChargerCostCell;