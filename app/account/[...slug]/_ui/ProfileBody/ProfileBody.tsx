"use client";

import { useContext } from "react";
import useSWR, { useSWRConfig } from "swr";

import { logout } from "@/_src/actions/auth";
import { getProfileFetcher } from "@/_src/actions/fetchers";
import { LogoutIcon, PenIcon } from "@/_src/components/icons";
import { Button } from "@/_src/components/items";
import { Avatar } from "@/_src/components/ui";
import { ModalContext } from "@/_src/providers/modal-context";
import { Modals, UserType } from "@/_src/types";

import s from "./ProfileBody.module.scss";

export const ProfileBody = ({ user }: { user: UserType }) => {
  const { cache } = useSWRConfig();
  const { openModal } = useContext(ModalContext);
  const { data } = useSWR<UserType>(`${process.env.NEXT_PUBLIC_API_URL}/profile`, getProfileFetcher);
  const { name, image, email, description } = data || {};
  const isEditable = data?.slug === user.slug;

  return (
    <>
      <Avatar className={s.avatar} image={isEditable ? image : user.image} name={isEditable ? name : user.name} big />
      <div className={s.header}>
        <h1>{isEditable ? name : user.name}</h1>
        {isEditable && (
          <Button
            onClick={() => openModal({ modalName: Modals.EditProfileForm })}
            className={s.btn}
            style="secondary"
            size="small"
          >
            <PenIcon />
            Редактировать
          </Button>
        )}
        <p className={s.email}>{isEditable ? email : user.email}</p>
      </div>
      <div className={s.content}>
        <p>{isEditable ? description : user.description}</p>
      </div>
      {isEditable && (
        <Button
          onClick={() => {
            logout();
            cache.delete(`${process.env.NEXT_PUBLIC_API_URL}/profile`);
          }}
          style="secondary"
          size="small"
        >
          <LogoutIcon />
          Выйти
        </Button>
      )}
    </>
  );
};
