import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/Globals/ui/dropdown-menu";
import { CalendarCheck, ChevronDown, PersonStanding } from "lucide-react";
import { Button } from "@/components/Globals/ui/button";

import { FaChevronDown } from "react-icons/fa6";
import CheckInIcon from "../Icons/frontdesk/Patient/CheckInIcon";
import CancelAppointment from "@/components/frontdesk/Dashboard/Appointmentts/CancelAppointment/CancelAppointments";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

const TableActions = ({
  status,
  setshowVisitModal,
  setrescheduleModal,
  setEditReferral,
  setDeleteReferal,
  id,
}) => {
  const menuITem = [
    {
      name: "Create Visit",
      handleClick: () => {},
    },
    {
      name: "Transfer to Vitals",
      handleClick: () => {},
    },
    {
      name: "Allocate to Doctor",
      handleClick: () => {},
    },
    {
      name: "Cancel",
      handleClick: () => {},
    },
    {
      name: "Reschedule",
      handleClick: () => {},
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          size="sm"
          className="relative bg-transparent border-none right-2 hover:bg-transparent"
          //variant="outline"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <BsThreeDotsVertical
            style={{ cursor: "pointer", fontSize: "1.3rem" }}
            color="#64748B"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        // onClick={(e) => e.stopPropagation()}
        className="text-slate-500"
      >
        {status !== "CANCELED" && setshowVisitModal && (
          <DropdownMenuItem
            className="my-2"
            onClick={(e) => {
              e.stopPropagation();
              setshowVisitModal(true);
            }}
          >
            <CheckInIcon
              className="w-4 h-4 mr-2 text-table-dark-600"
              color={"#394E75"}
            />{" "}
            <span className="text-xs text-table-dark-600">Create Visit</span>
          </DropdownMenuItem>
        )}
        {status === "PENDING" && setrescheduleModal && (
          <DropdownMenuItem
            className="my-2"
            onClick={(e) => {
              e.stopPropagation();
              setrescheduleModal(true);
            }}
          >
            <CalendarCheck className="w-4 h-4 mr-2 text-table-dark-600" />{" "}
            <span className="text-xs text-table-dark-600">
              Reschedule Appointment Visit
            </span>
          </DropdownMenuItem>
        )}

        {setEditReferral && (
          <DropdownMenuItem
            className="my-2"
            onClick={(e) => {
              e.stopPropagation();
              setEditReferral(true);
            }}
          >
            <CiEdit className="text-[16px]" />
            <span className="text-xs text-table-dark-600">
              Edit External Referral
            </span>
          </DropdownMenuItem>
        )}

        {setDeleteReferal && (
          <DropdownMenuItem
            className="my-2"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteReferal(true);
            }}
          >
            <MdOutlineDeleteOutline size={17} color="gray" />
            <span className="text-xs text-table-dark-600">
              Delete External Referral
            </span>
          </DropdownMenuItem>
        )}

        {status !== "CANCELED" && (
          <DropdownMenuItem className="my-2">
            <CancelAppointment tooltip={true} />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActions;
