"use client";

import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import "../styles.css";
import { Router } from "next/router";
import { modalTheme } from "../themes";

export default function ModalComponent({ openModal, setOpenModal }) {
  return (
    <Modal
      dismissible
      show={openModal}
      onClose={() => setOpenModal(false)}
      theme={modalTheme}
      size={"xl"}
    >
      <Modal.Header>
        <h3 className="relative mt-4 top-8 text-lg font-medium text-center left-[21%]">
          Patient Profile Created Successfully
        </h3>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col items-center w-3/4 m-auto mt-6 space-y-6">
          <div>
            <Image
              src="/images/successProfile.svg"
              width={"100"}
              height={"100"}
            />
          </div>
          <div className="">
            <p className="text-sm leading-8 text-gray-500">
              New Patient Profile has been successfully created
            </p>
            <b className="text-sm leading-8 text-gray-500 ">
              We have sent a notification message to your mail
            </b>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="w-48 m-auto cursor-pointer bg-brand-1000 modal_btn save_btn"
          onClick={() => {
            Router.push("/frontdesk/patients/");
            setOpenModal(false);
          }}
          pill
          size={"sm"}
        >
          View Profile
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
