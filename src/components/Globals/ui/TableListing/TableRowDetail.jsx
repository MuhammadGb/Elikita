"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/Globals/ui/dialog";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { Loader, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { convertToReadableDate } from "@/utils";
import { useGetPatientProfileImageQuery } from "@/redux/services/patientService";
import { formatDate } from "@/lib/utils";
import { toast } from "react-toastify";
import ImageModal from "../../../frontdesk/Dashboard/Patient/ImageModal";
import { useGetSingleAppointmentQuery } from "@/redux/services/appointmentService";

const TableRowDetail = ({ showDetailModal, close, eventId }) => {
  const { data, isLoading, error } = useGetSingleAppointmentQuery(eventId);

  const [imgToggle, setImgToggle] = useState(false);

  const { data: profileImageData, isSuccess: profileImageSuccess } =
    useGetPatientProfileImageQuery(data?.data?.patientId);

  //console.log(profileImageData);

  if (error) {
    toast.error("Unable to fetch appointment details,Try again later");
  }
  return (
    <Dialog
      open={showDetailModal}
      onOpenChange={close}
      className=""
      asChild={true}
    >
      <DialogContent className="sm:max-w-[480px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-brand-800 text-[16px] text-center">
            Appointment Details
          </DialogTitle>
          {isLoading ? (
            <div className="h-[5rem] xl:h-[10rem] flex items-center justify-center">
              <Loader className="w-8 h-8 mx-auto animate-spin" />
            </div>
          ) : (
            <DialogDescription>
              {!isLoading && !data?.data ? (
                <div className="flex items-center justify-center w-full gap-10 mt-8">
                  <p className="text-center">`No record for Appointment`</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full gap-1 mt-2">
                  {/* <div className="w-[4rem] max-md:mx-auto h-[4rem] md:w-[5rem] md:h-[5rem] rounded-full border-2 border-brand-1000">
                    
                    {userImage ? (
                      <img
                        src={userImage}
                        alt="Patient Profile Image"
                        className="object-cover w-full h-full rounded-full"
                      />
                    ) : (
                      <FaUserCircle className="w-full h-full rounded-full" />
                    )}
                  </div> */}
                  <ImageModal
                    imgToggle={imgToggle}
                    patData={profileImageData}
                    setImgToggle={setImgToggle}
                  />
                  <div className="flex flex-col items-center justify-center w-full gap-6 mt-8 ">
                    <div className="grid w-full grid-cols-3">
                      <p className="text-brand-800 text-[14px] col-span-1 ">
                        Patient Name:
                      </p>
                      <p className="text-[14px] col-span-2 pl-2">
                        {data?.data?.firstName || ""}{" "}
                        {data?.data?.lastName || ""}{" "}
                      </p>
                    </div>
                    <div className="grid w-full grid-cols-3">
                      <p className="text-brand-800 text-[14px] col-span-1 ">
                        File No:
                      </p>
                      <p className="text-[14px] col-span-2 pl-2">
                        {data?.data?.fileNo}
                      </p>
                    </div>
                    <div className="grid w-full grid-cols-3">
                      <p className="text-brand-800 text-[14px] col-span-1 ">
                        Patient feeling:
                      </p>
                      <p className="text-[14px] col-span-2 pl-2">
                        {data?.data?.title}
                      </p>
                    </div>
                    <div className="grid w-full grid-cols-3">
                      <p className="text-brand-800 text-[14px] col-span-1 ">
                        Phone No:
                      </p>
                      <p className="text-[14px] col-span-2 pl-2">
                        {data?.data?.telephone}
                      </p>
                    </div>
                    <div className="grid w-full grid-cols-3">
                      <p className="text-brand-800 text-[14px] col-span-1 ">
                        Address:
                      </p>
                      <p className="text-[14px] col-span-2 pl-2">
                        {data?.data?.address}
                      </p>
                    </div>
                    <div className="grid w-full grid-cols-3">
                      <p className="text-brand-800 text-[14px] col-span-1 ">
                        Date of birth:
                      </p>
                      <p className="text-[14px] col-span-2 pl-2">
                        {data?.data?.dateOfBirth}
                      </p>
                    </div>
                    <div className="grid w-full grid-cols-3">
                      <p className="text-brand-800 text-[14px] col-span-1 ">
                        Appointment Starts:
                      </p>
                      <p className="text-[14px] col-span-2 pl-2">
                        {formatDate(data?.data?.startDay)}
                      </p>
                    </div>
                    <div className="grid w-full grid-cols-3">
                      <p className="text-brand-800 text-[14px] col-span-1 ">
                        Appointment Ends:
                      </p>
                      <p className="text-[14px] col-span-2 pl-2">
                        {formatDate(data?.data?.endDay)}
                      </p>
                    </div>
                    <div className="grid w-full grid-cols-3">
                      <p className="text-brand-800 text-[14px] col-span-1 ">
                        Appointment Status:
                      </p>
                      <p className="text-[14px] col-span-2 pl-2">
                        {data?.data?.status}
                      </p>
                    </div>
                    <div className="grid w-full grid-cols-3">
                      <p className="text-brand-800 text-[14px] col-span-1 ">
                        Reason for Appointment:
                      </p>
                      <p className="text-[14px] col-span-2 pl-2">
                        {data?.data?.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </DialogDescription>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TableRowDetail;
