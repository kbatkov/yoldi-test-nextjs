"use client";

import React, { useContext } from "react";
import { useCallback, useEffect, useRef } from "react";

import { EditProfileForm } from "@/_src/components/forms";
import { ModalContext } from "@/_src/providers/modal-context";
import { Modals } from "@/_src/types";

import styles from "./ModalLayout.module.scss";

export const ModalLayout = () => {
  const { isOpen, closeModal, modalName } = useContext(ModalContext);
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement | null>(null);

  const onClickOutside = useCallback(
    (e: any) => {
      if (overlay.current && wrapper.current && !wrapper.current.contains(e.target)) {
        closeModal();
      }
    },
    [closeModal],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    },
    [closeModal],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  useEffect(() => {
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [onClickOutside]);

  return (
    <>
      {isOpen && (
        <div className={styles.overlay} ref={overlay}>
          <div className={styles.dialog} ref={wrapper}>
            {modalName === Modals.EditProfileForm && <EditProfileForm />}
          </div>
        </div>
      )}
    </>
  );
};
