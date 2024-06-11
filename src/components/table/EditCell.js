import useAuthStore from "../../store/useAuthStore";
import usePhases from "../../store/usePhases";
import useYearOverYear from "../../store/useYearOverYear";
import { Button } from "../../components/ui/button";
import { BiSolidPencil } from "react-icons/bi";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";



const EditCell = ({ row, table }) => {
  const meta = table.options.meta;
  const { phases, fetchPhases } = usePhases();

  const removeRow = async () => {
    meta?.removeRow(row.index);
    try {
      const response = await fetch(`http://localhost:3002/api/phases/${row.original.id}`, {
        method: 'DELETE',
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete the phase');
      }
  
      console.log('Phase deleted successfully:', result);
      await fetchPhases(user.id);
    } catch (error) {
      console.error('Error deleting phase:', error);
      // Optionally, handle the UI update or show a message to the user
    }
  };
  
  const {user} = useAuthStore();
  const setEditedRows = (e) => {
    const elName = e.currentTarget.name;

    meta?.setEditedRows((old) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== "edit") {
      meta?.revertData(row.index, e.currentTarget.name === "cancel");
    }

    if (elName === "done") {
      fetch("http://localhost:3002/api/phases/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(row.original),
      })
        .then((response) => response.json())
        .then(async (data) => {
          // Handle the response from the API
          await fetchPhases(user.id);
        })
        .catch((error) => {
          // Handle any errors that occur during the API request
          console.error(error);
        });
    }
  };
  return meta?.editedRows[row.id] ? (
    <div className="flex w-16 ">
    
      <button className="flex-1" onClick={setEditedRows} name="done">
        <MdCheckCircle size={23} className="text-gray-500 hover:text-gray-300"/>
      </button>
      <button className="flex-1" onClick={setEditedRows} name="cancel">
        <MdCancel size={23} className=" text-gray-500 hover:text-gray-300"/>
      </button>
    </div>
  ) : (
    <div className="flex w-16 gap-2">
      <button className="flex-1 text-gray-500 hover:text-gray-300" onClick={setEditedRows} name="edit">
        <BiSolidPencil size={23} />
      </button>
      <button className="flex-1 text-gray-500 hover:text-gray-300" onClick={removeRow} name="cancel">
        <FaTrash size={18} />
      </button>
    </div>
  );
};
export default EditCell;
