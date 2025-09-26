"use client";

import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import PatientInfos from "./PatientInfos";
import Symptoms from "./Symptoms";
import FollowUps from "./FollowUps";
import Summary from "./Summary";
import { Button } from "flowbite-react";
import { useEffect, useState, useRef } from "react";
import Modal from "./utils/SuccessModal";
import "./styles.css";
import { buttonTheme } from "./themes";
import { useSearchParams } from "next/navigation";
import Intro from "./Intro";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

const tabTheme = {
  base: "flex flex-col gap-2 w-full",
  tablist: {
    base: "flex text-center w-full justify-start md:justify-center items-center",
    styles: {
      default: "flex-wrap   border-gray-500 w-full ",
      underline: "flex-wrap bg-[#f9fafb] pb-1 md:py-4 m-0",
    },
    tabitem: {
      base: "flex items-center text-nowrap justify-center py-1 md:py-2 lg:mx-2 mx-1 my-2 md:my-0 md:w-1/6 flex justify-center focus:ring-0 focus:ring-slate-400 focus:outline-none",
      styles: {
        underline: {
          base: "font-[500] text-[10px] sm:text-[14px] px-4 cursor-pointer  rounded-lg bg-white",
          active: {
            on: "text-brand-1000 bg-blue-500 text-white active",
            off: " bg-white text-slate-600 hover:border hover:border-brand-1000 ",
          },
        },
      },
    },
  },
  tabitemcontainer: {
    base: " w-full  m-0",
    styles: {
      default: " w-full ",
      underline: " w-full ",
    },
  },
  tabpanel: "py-3  w-full",
};

export default function Profiles() {
  const [activeTab, setActiveTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [nxtBtn, setNxtBtn] = useState({
    patientInfo: false,
    symptoms: false,
    followUps: false,
  });
  const [patientID, setPatientID] = useState(null);
  const tabsRef = useRef(null);
  const [mobileWindows, setMobileWindows] = useState(false);
  const searchParams = useSearchParams();

  const TOTAL_TABS = 5;

  useEffect(() => {
    const patientId = searchParams.get("id");
    if (patientId) {
      setPatientID(patientId);
      setEditMode(true);
      setActiveTab(0);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleResize = () => {
      setMobileWindows(window.innerWidth < 520);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (direction) => {
    tabsRef.current?.setActiveTab((prevTab) => {
      const newTab = prevTab + direction;
      return Math.max(0, Math.min(newTab, TOTAL_TABS - 1));
    });
  };

  // const handleSubmit = (data) => {
  //   setOpenModal(true);
  // };

  return (
    <div className="flex-col justify-center min-h-screen bg-brown-300 ">
      {/* <Navbar /> */}
      <div className="relative z-20 px-4 pt-4 pb-4 lg:px-12 lg:pb-14 bg-gray-50">
        <Tabs
          style="underline"
          theme={tabTheme}
          activeTab={activeTab}
          ref={tabsRef}
          onActiveTabChange={(tab) => {
            setActiveTab(tab);
          }}
          className="w-full"
        >
          <Tabs.Item value={0} title="Intro">
            <div className="min-h-[50vh] bg-white pt-2">
              <Intro />
            </div>
          </Tabs.Item>
          <Tabs.Item value={1} title="Patient Info">
            <div className="min-h-[50vh] bg-white pt-2">
              <PatientInfos
                patientID={patientID}
                setPatientID={setPatientID}
                tabsRef={tabsRef}
                nxtBtn={nxtBtn}
                mobileWindows={mobileWindows}
                editMode={editMode}
                activeTab={activeTab}
                setNxtBtn={setNxtBtn}
                setEditMode={setEditMode}
              />
            </div>
          </Tabs.Item>
          <Tabs.Item value={2} title="Symptoms">
            <div className="min-h-[50vh]">
              <Symptoms
                patientID={patientID}
                tabsRef={tabsRef}
                nxtBtn={nxtBtn}
                editMode={editMode}
                activeTab={activeTab}
                setNxtBtn={setNxtBtn}
                mobileWindows={mobileWindows}
              />
            </div>
          </Tabs.Item>
          <Tabs.Item value={3} title="Follow-ups">
            <div className="min-h-[50vh]">
              <FollowUps
                patientID={patientID}
                tabsRef={tabsRef}
                nxtBtn={nxtBtn}
                editMode={editMode}
                activeTab={activeTab}
                setNxtBtn={setNxtBtn}
                mobileWindows={mobileWindows}
              />
            </div>
          </Tabs.Item>
          <Tabs.Item value={4} title="Summary">
            <div className="min-h-[50vh]">
              <Summary
                patientID={patientID}
                tabsRef={tabsRef}
                mobileWindows={mobileWindows}
                editMode={editMode}
                activeTab={activeTab}
              />
            </div>
          </Tabs.Item>
        </Tabs>
        <Modal openModal={openModal} setOpenModal={setOpenModal} />
      </div>
      <div className="fixed bottom-0 z-50 flex justify-center w-full bg-gray-100 ">
        <div className="flex items-center justify-between w-full h-20 px-4 mx-auto md:w-11/12lg:w-1/2">
          <Button
            onClick={() => handleNavigation(-1)}
            disabled={activeTab === 0}
            color="gray"
            className="w-32 md:w-44 "
          >
            <FaLongArrowAltLeft className="mt-1 mr-2" /> Back
          </Button>
          <Button
            onClick={() => handleNavigation(1)}
            // disabled={activeTab === TOTAL_TABS - 1}
            className="w-32 md:w-44 bg-[#2563eb] save_btn "
          >
            Next <FaLongArrowAltRight className="mt-1 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
