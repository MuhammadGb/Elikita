"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function DeleteModal(props) {
  const {
    openDeleteModal,
    setOpenDeleteModal,
    handleDeleteAction,
    content,
    deleteLoading,
    type,
    statusMode
  } = props;

  return (
    <>
      {type !== "TABLE" && (
        <Button onClick={() => setOpenDeleteModal(true)}>Toggle modal</Button>
      )}
      <Modal
        show={openDeleteModal}
        size="md"
        onClose={() => setOpenDeleteModal(false)}
        popup
        onDoubleClick={(e) => e.stopPropagation()}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h6 className="mb-5 font-normal text-gray-500 text-md dark:text-gray-700">
              Are you sure you want to delete {content ?? "patient"} {  statusMode==="logo"?"Logo":"profile"}?
            </h6>
            <div className="flex justify-center gap-8 mt-6">
              <Button
                color="failure"
                size={"sm"}
                onClick={() => handleDeleteAction()}
                disabled={deleteLoading}
              >
                Continue {deleteLoading ? "loading" : ""}
              </Button>
              <Button
                color="dark"
                size={"sm"}
                onClick={() => setOpenDeleteModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
