import useAuthStore from "../../store/useAuthStore";
import usePhases from "../../store/usePhases";
import useYearOverYear from "../../store/useYearOverYear";
import { Button } from "../../components/ui/button";
import { BiSolidPencil } from "react-icons/bi";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";


const EditCell = ({ row, table }) => {
  const meta = table.options.meta;
  const { phases, fetchPhases,setPhases } = usePhases();
  const { initYearOverYear } = useYearOverYear();
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
          
        //   initYearOverYear();
        })
        .catch((error) => {
          // Handle any errors that occur during the API request
          console.error(error);
        });
    }
  };
  return meta?.editedRows[row.id] ? (
    <div className="flex w-16">
    
      <button className="flex-1" onClick={setEditedRows} name="done">
        <MdCheckCircle size={23} className="text-black"/>
      </button>
      <button className="flex-1" onClick={setEditedRows} name="cancel">
        <MdCancel size={23} className="text-black"/>
      </button>
    </div>
  ) : (
    <div className="flex w-16">
      <button onClick={setEditedRows} name="edit">
        <BiSolidPencil size={23} />
      </button>
      <div className="flex-1 h-full"></div>
    </div>
  );
};
export default EditCell;
