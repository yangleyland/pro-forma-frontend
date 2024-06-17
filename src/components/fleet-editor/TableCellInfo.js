import { useState, useEffect,useRef } from "react";
import { Input } from "../../components/ui/input";


const TableCellInfo = ({ getValue, row, column, table }) => {
  const initialValue = getValue();

  const inputRef = useRef(null);
  const [value, setValue] = useState(initialValue);
  const [tempValue, setTempValue] = useState(initialValue);
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  
  useEffect(() => {
    setValue(initialValue);
    setTempValue(initialValue); // Keep temp value in sync with initial value
  }, [initialValue]);

  const onBlur = () => {

    table.options.meta?.updateData(row.index, column.id, tempValue);
  };
  const onSelectChange = (e) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };
  const formatValue = (value) => {
    if (columnMeta?.type === "currency") {
      const amount = parseFloat(value);
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    }
    return value;
  };
  const alignmentClass = (columnMeta?.type === "currency"||columnMeta?.type ==="number") ? "text-right" : "text-left";

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <select onChange={onSelectChange} value={initialValue}>
        {columnMeta?.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <Input
        ref={inputRef}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || "text"}
        className={alignmentClass}
        variant="table"
      />
    );
  }
  return (
    // <Input
    //   value={value}
    //   // onChange={e => setValue(e.target.value)}
    //   variant="disabled"
    //   onBlur={onBlur}
    //   type={columnMeta?.type || "text"}
    //   className=""
    // />
    <p className={`${alignmentClass} text-nowrap w-full p-4`}>{formatValue(value)}</p>
  );
};

export default TableCellInfo;
