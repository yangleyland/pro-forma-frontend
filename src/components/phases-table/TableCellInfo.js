import { useState, useEffect, useRef } from "react";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

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
    tableMeta?.updateData(row.index, column.id, value);
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
        minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      }).format(amount);
    }
    return value;
  };
  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <Select
        onValueChange={(value) => onSelectChange({ target: { value } })}
        value={initialValue}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Site" />
        </SelectTrigger>
        <SelectContent>
          {columnMeta?.options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
    <p ref={textRef} className="text-nowrap w-full p-4">
      {formatValue(value)}
    </p>
  );
};

export default TableCellInfo;
