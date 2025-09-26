import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "../avatar";
import { Contact, EllipsisVertical, User } from "lucide-react";
import { Button } from "flowbite-react";

import Link from "next/link";
import { useState } from "react";
import VitalsDetails from "@/components/Opdnursing/Dashboard/Vitals/VitalsDetail";
import { CgProfile } from "react-icons/cg";
import { useClickOutside } from "@/components/Profile/utils/errors";
import { Popover } from "flowbite-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatDate } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/Globals/ui/dropdown-menu";
import { Button as Buttoncn } from "@/components/Globals/ui/button";
import { TbActivityHeartbeat } from "react-icons/tb";
import { useGetPatientProfileImageQuery } from "@/redux/services/patientService";
import Image from "next/image";
import { Loader } from "lucide-react";
const CardList = ({
  index,
  patientFirstName,
  patientSurname,
  patientOtherNames,
  maritalStatus,
  imageData,
  gender,
  effectiveDate,
  patientFileNumber,
  visitConsultationId,
  language,
  comment,
  data,
  age,
  visitId,
  patientId,
  title,
  patientTelephone1,
  consultationId,
}) => {
  const colors = ["#0CAF1C", "#EE786C", "#4D6FED"];
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const popperRef = useClickOutside(() => setIsActionOpen(false));
  const [imgToggle, setImgToggle] = useState(null);
  const {
    data: profileImageData,
    isLoading,
    isSuccess,
  } = useGetPatientProfileImageQuery(patientId);

  const userImage =
    isSuccess && profileImageData?.file
      ? `data:image/png;base64,${profileImageData.file}`
      : null;
  return (
    <>
      <div
        className=" border border-gray-100 bg-white rounded-[6px] border-l-[6px]  card-shadow p-5 cursor-pointer"
        onDoubleClick={() => setOpenDetailsModal(!openDetailsModal)}
        style={{ borderLeftColor: colors[index % colors.length] }}
      >
        <div className="flex items-center justify-between">
          <div className="flex text-[#587B97] gap-5">
            <div className="mr-4">
              {isLoading ? (
                <Loader className="w-5 h-5 mx-auto animate-spin" />
              ) : !userImage ? (
                <CgProfile fontSize={60} color={"gray"} />
              ) : (
                <div className="relative w-12 h-12">
                  <Image
                    alt="Patient image"
                    layout="fill"
                    src={userImage}
                    onClick={() => setImgToggle(!imgToggle)}
                    className="object-cover border rounded-full"
                  />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-base font-medium">
                {patientSurname} {patientFirstName} {patientOtherNames}
              </h3>
              {/* visitConsultationId */}
              <Link
                href={`/opdnursing/consult?conId=${consultationId}&def=vitals`}
              >
                <Button
                  size="xs"
                  color="blue"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="flex items-center mt-2 h-6 w-32 sm:h-fit ring_btn bg-[#2F5A76]"
                >
                  {" "}
                  Take Vitals
                </Button>
              </Link>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Buttoncn
                size="sm"
                className="relative bg-transparent border-none left-2 hover:bg-transparent"
                //variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <BsThreeDotsVertical
                  style={{ cursor: "pointer", fontSize: "1.3rem" }}
                  color="#64748B"
                />
              </Buttoncn>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-slate-500">
              <DropdownMenuItem className="cursor-pointer">
                <Link
                  onClick={(e) => e.stopPropagation()}
                  href={`/opdnursing/consult?conId=${consultationId}&def=vitals`}
                  className="flex no-underline "
                >
                  <Contact
                    className="w-4 h-4 mr-2 border-none text-table-dark-600"
                    color={"#394E75"}
                  />
                  Take Patient's Vitals
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <div className="relative" ref={popperRef}>
						<Popover
						placement="right"
						open={isActionOpen}
						className="z-50 min-w-44"
						arrow={false}
						content={
							<div className="absolute p-5 bg-white rounded-lg shadow-md top-[108%] w-[200px]">
							<Link
								onClick={(e) => e.stopPropagation()}
								href={`/opdnursing/consultation?id=${visitId}&default=vitals`}
								className="flex gap-2 py-2 no-underline "
							>
								<Contact
								className="w-4 h-4 mr-2 border-none text-table-dark-600"
								color={"#394E75"}
								/>{" "}
								<span className="text-xs text-table-dark-600">
								Take Patient's Vitals
								</span>
							</Link>
							</div>
						}
						>
						<BsThreeDotsVertical
							fontSize={21}
							style={{ cursor: "pointer" }}
							onClick={(e) => {
							e.stopPropagation();
							setIsActionOpen(!isActionOpen);
							}}
						/>
						</Popover>
          </div> */}
        </div>
        <div className="grid grid-cols-12 gap-5 mt-4">
          {/* <div className="col-span-3">
            <h3 className="text-[9px] sm:text-[11px] lg:text-[12px] font-medium text-[#587B97]">
              Full Name
            </h3>
            <p className="text-[9px] sm:text-[11px] lg:text-[12px] text-[#394E75] font-semibold mt-2">
              {patientSurname} {patientFirstName} {patientOtherNames}
            </p>
          </div> */}
          <div className="col-span-3">
            <h3 className="text-[9px] sm:text-[11px] lg:text-[12px] font-medium text-[#587B97]">
              Gender
            </h3>
            <p className="text-[9px] sm:text-[11px] lg:text-[12px] text-[#394E75] font-semibold mt-2">
              {gender}
            </p>
          </div>
          <div className="col-span-3">
            <h3 className="text-[9px] sm:text-[11px] lg:text-[12px] font-medium text-[#587B97]">
              Date
            </h3>
            <p className="text-[9px] sm:text-[11px] lg:text-[12px] text-[#394E75] font-semibold mt-2">
              {formatDate(effectiveDate)}
            </p>
          </div>
          <div className="col-span-3">
            <h3 className="text-[9px] sm:text-[11px] lg:text-[12px] font-medium text-[#587B97]">
              Age
            </h3>
            <p className="text-[9px] sm:text-[11px] lg:text-[12px] text-[#394E75] font-semibold mt-2">
              {" "}
              {age}
            </p>
          </div>

          <div className="col-span-3">
            <h3 className="text-[9px] sm:text-[11px] lg:text-[12px] font-medium text-[#587B97]">
              Comments
            </h3>
            <p className="text-[9px] sm:text-[11px] lg:text-[12px] text-[#394E75] font-semibold mt-2 truncate max-w-[100px]">
              {comment}
            </p>
          </div>

          <div className="col-span-3">
            <h3 className="text-[9px] sm:text-[11px] lg:text-[12px] font-medium text-[#587B97]">
              Preferred Language
            </h3>
            <p className="text-[9px] sm:text-[11px] lg:text-[12px] text-[#394E75] font-semibold mt-2">
              {language}
            </p>
          </div>
          <div className="col-span-3">
            <h3 className="text-[9px] sm:text-[11px] lg:text-[12px] font-medium text-[#587B97]">
              File No.
            </h3>
            <p className="text-[9px] sm:text-[11px] lg:text-[12px] text-[#394E75] font-semibold mt-2">
              {patientFileNumber}
            </p>
          </div>
        </div>
      </div>
      {openDetailsModal && (
        <VitalsDetails
          showDetailModal={openDetailsModal}
          close={() => setOpenDetailsModal(false)}
          data={data}
        />
      )}
    </>
  );
};
export default CardList;
