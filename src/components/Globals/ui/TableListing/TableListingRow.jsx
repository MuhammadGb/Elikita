"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/Globals/ui/tooltip";
import CancelAppointment from "@/components/frontdesk/Dashboard/Appointmentts/CancelAppointment/CancelAppointments";
import RescheduleAppointmentModal from "@/components/frontdesk/Dashboard/Appointmentts/RescheduleAppointment/RecheduleAppointment";
import ExternalReferralDetail from "@/components/frontdesk/Dashboard/External-referral/ExternalReferralDetail";
import CreateVisitModal from "@/components/frontdesk/Dashboard/Patient/CreateVisitModal";
import { CalendarCheck } from "lucide-react";
import { useState } from "react";
import CheckInIcon from "../Icons/frontdesk/Patient/CheckInIcon";
import { TableCell, TableRow } from "../table";
import TableActions from "./TableActionsDropDown";
import TableRowDetail from "./TableRowDetail";

const Cell = ({ RenderContent }) => {
  return (
    <TableCell className="text-[11px] md:text-[12px] text-brand-300 h-[10px]">
      {RenderContent}
    </TableCell>
  );
};

const TableListingRow = ({
  item,
  showActionItems,
  showReferralDetails = false,
  rawData,
  index,
  Component,
  settriggerSearch,
}) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showVisitModal, setshowVisitModal] = useState(false);
  const [showCreateModal, setCreateModal] = useState(false);
  const [rescheduleModal, setrescheduleModal] = useState(false);
  const [showReferralDetailModal, setShowReferralDetailModal] = useState(false);

  function handleCloseVisitModal() {
    setshowVisitModal(false);
  }

  function handleCloseRescheduleModal() {
    setrescheduleModal(false);
  }

  function handleCloseReferralDetailModal() {
    setShowReferralDetailModal(false);
  }

  return (
    <>
      <TableRow
        onClick={() => {
          setCreateModal(true);
        }}
        onDoubleClick={() => {
          setShowDetailModal(true);
          setShowReferralDetailModal(true);
        }}
        className="whitespace-nowrap"
      >
        {Object.keys(item).map((key) => {
          if (key !== "id") return <Cell RenderContent={item[key]} key={key} />;
          return null;
        })}
        {showActionItems && (
          <TableCell className={`px-2 py-3`}>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    disabled={rawData[index]?.status === "CANCELED"  || rawData[index]?.status === "RESCHEDULED"}
                  >
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setshowVisitModal(true);
                      }}
                    >
                      <CheckInIcon
                        color={
                          rawData[index]?.status === "CANCELED" || rawData[index]?.status === "RESCHEDULED"
                            ? "#aaa"
                            : "#394E75"
                        }
                        className={`w-4 h-4 ${
                          rawData[index]?.status === "CANCELED" || rawData[index]?.status === "RESCHEDULED"
                            ? "text-gray-400"
                            : "text-table-gray-600"
                        }`}
                      />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Check In</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    disabled={!(rawData[index]?.status === "PENDING")}
                  >
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setrescheduleModal(true);
                      }}
                    >
                      <CalendarCheck
                        className={`w-4 h-4 ${
                          !(rawData[index]?.status === "PENDING")
                            ? "text-gray-400"
                            : "text-table-gray-600"
                        }`}
                      />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reschedule Appointment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <span
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <CancelAppointment
                  id={rawData[index]?.eventId}
                  status={rawData[index]?.status}
                  settriggerSearch={settriggerSearch}
                />
              </span>

              {rawData[index]?.status !== "CANCELED" && rawData[index]?.status !== "RESCHEDULED" && (
  <TableActions
    setshowVisitModal={setshowVisitModal}
    setrescheduleModal={setrescheduleModal}
    id={rawData[index]?.eventId}
    status={rawData[index]?.status}
  />
)}
            </div>
          </TableCell>
        )}
        {/* {!showActionItems && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger disabled={rawData[index]?.status === "CANCELED"}>
								<span>
									<UserPlus className='w-4 h-4 mt-4 mr-6 text-table-dark-600' />
								</span>
							</TooltipTrigger>
							<TooltipContent>
								<p>Create Appointment</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)} */}
        {!showActionItems && (
          <span
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Component rawData={rawData} index={index} />
          </span>
        )}
      </TableRow>
      {showDetailModal && showActionItems && (
        <TableRowDetail
          showDetailModal={showDetailModal}
          eventId={rawData[index]?.eventId}
          close={() => setShowDetailModal(false)}
        />
      )}
      {/* {!showActionItems && showCreateModal && (
				<CreateAppointmentModal
					showDetailModal={showCreateModal}
					close={() => setCreateModal(false)}
					patiendtData={rawData[index]}
				/>
			)} */}

      {showVisitModal && (
        <CreateVisitModal
          showVisitModal={showVisitModal}
          close={handleCloseVisitModal}
          id={rawData[index]?.patientID}
          mode={"APPOINTMENT"}
          patientName={rawData[index]?.firstName}
          modeId={rawData[index]?.eventId}
        />
      )}
      {rescheduleModal && (
        <RescheduleAppointmentModal
          close={handleCloseRescheduleModal}
          showRescheduleModal={rescheduleModal}
          appointmentData={rawData[index]}
          settriggerSearch={settriggerSearch}
        />
      )}

      {showReferralDetailModal && showReferralDetails && (
        <ExternalReferralDetail
          showDetailModal={showReferralDetailModal}
          close={() => setShowReferralDetailModal(false)}
          referralData={rawData[index]}
        />
      )}
    </>
  );
};

export default TableListingRow;
