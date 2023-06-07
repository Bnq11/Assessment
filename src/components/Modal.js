import React, { Fragment } from 'react';

import {
  Dialog,
  Transition,
} from '@headlessui/react';

// export interface ModalProps {
//   title: string | React.ReactNode;
//   handleClose: () => void;
//   isOpen: boolean;
//   width?: string;
//   children: React.ReactNode;
//   categoryId: string;
//   data : any
// }

export const Modal = ({
  width,
  isOpen,
  handleClose,
}) => {

  return (
    
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-80 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog
        onClose={handleClose}
        className="fixed inset-0 z-10 overflow-auto shadow-xl"
      >
        <div className="flex min-h-screen justify-center pt-12">
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 opacity-40" />
          <div
            className={`my-8 inline-block h-fit w-full ${
              width ? width : "max-w-2xl"
            } transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all`}
          >
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-xl font-medium leading-6 text-gray-900">
                dsadasdsa
              </Dialog.Title>
              {/* <FaTimes
                className="cursor-pointer text-sm"
                onClick={handleClose}
              /> */}
              hii
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};


