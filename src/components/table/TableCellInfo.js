import { useState, useEffect, useRef } from "react";
import { Input } from "../../components/ui/input";

const TableCellInfo = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const textRef = useRef(null);
  const [inputWidth, setInputWidth] = useState(0);
  const inputRef = useRef(null);
  const [value, setValue] = useState(initialValue);
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;


  useEffect(() => {
    if (textRef.current) {
      setInputWidth(textRef.current.offsetWidth);
    }
  }, [value]);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };
  const onSelectChange = (e) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };
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
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || "text"}
        className=""
        style={{ width: inputWidth }}
      />
    );
  }
  return (
    <p ref={textRef} className="text-nowrap w-full p-4">{value}</p>
  );
};

export default TableCellInfo;
