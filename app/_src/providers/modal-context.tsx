"use client";

import React, { createContext, ReactNode, useState } from "react";

import { Modals } from "../types";

interface ModalContextType {
  isOpen: boolean;
  openModal: ({ modalName }: { modalName: Modals | null }) => void;
  closeModal: () => void;
  modalName: Modals | null;
}

export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  modalName: null,
});

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalName, setModalName] = useState<Modals | null>(null);

  const openModal = ({ modalName }: { modalName: Modals | null }) => {
    setIsOpen(true);
    setModalName(modalName);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const modalContextValue: ModalContextType = {
    isOpen,
    openModal,
    closeModal,
    modalName,
  };

  return <ModalContext.Provider value={modalContextValue}>{children}</ModalContext.Provider>;
};
