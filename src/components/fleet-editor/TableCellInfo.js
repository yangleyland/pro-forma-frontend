import { useState, useEffect,useRef } from "react";
import { Input } from "../../components/ui/input";

function calculateTextWidth(text, font) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  return context.measureText(text).width;
}

const TableCellInfo = ({ getValue, row, column, table }) => {
  const initialValue = getValue();

  const inputRef = useRef(null);
  const [value, setValue] = useState(initialValue);
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  
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
    <p className="text-nowrap w-full p-4">{value}</p>
  );
};

export default TableCellInfo;
