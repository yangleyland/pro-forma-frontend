import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { MdInfoOutline } from "react-icons/md";
import { Label } from "../ui/label";

const ControlLabel = ({ text,info }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <Label>
          <div className="flex gap-1">
            {text}
            <TooltipTrigger>
              <MdInfoOutline size={15} />
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
