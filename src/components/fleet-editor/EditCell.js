import { BiSolidPencil } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { useEffect } from "react";

const EditCell = ({ row, table }) => {
  const meta = table.options.meta;

  const setEditedRows = async (e) => {
    const elName = e.currentTarget.name;
    
    const updateData = await meta?.syncData(row.index);
    meta?.setEditedRows((old) => ({
      ...old,
      [row.id]: !old[row.id],
    }));

    if (elName !== "edit") {
      meta?.revertData(row.index, elName === "cancel");
    }

    if (elName === "done") {
      try {
        const response = await fetch("http://localhost:3002/api/fleet/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData[row.index]),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }


      } catch (error) {
        // Handle any errors that occur during the API request
        console.error("Error updating fleet data:", error);
      }
    }
  };




  return meta?.editedRows[row.id] ? (
    <div className="flex w-16">
      <button
        className="flex-1 text-gray-500 hover:text-gray-300"
        onClick={setEditedRows}
        name="done"
      >
        <MdCheckCircle size={23} className="" />
      </button>
      <button
        className="flex-1 text-gray-500 hover:text-gray-300"
        onClick={setEditedRows}
        name="cancel"
      >
        <MdCancel size={23} className="" />
      </button>
    </div>
  ) : (
    <div className="flex w-16 ">
      <button
        className="text-gray-500 hover:text-gray-300"
        onClick={setEditedRows}
        name="edit"
      >
        <BiSolidPencil size={23} />
      </button>
      <div className="flex-1 h-full"></div>
    </div>
  );
};
export default EditCell;
