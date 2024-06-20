import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { MdInfoOutline } from "react-icons/md";
import { Label } from "../ui/label";

const ControlLabel = ({ text, info }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <Label className="w-full">
          <div className="w-full flex gap-2">
            {text}
          <TooltipTrigger asChild>
              <button>
                <MdInfoOutline size={15} />
              </button>
            </TooltipTrigger>
            


          </div>
        </Label>
        <TooltipContent>
          <p>{info}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ControlLabel;
