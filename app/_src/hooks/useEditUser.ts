"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";

import { editUserFetcher } from "../actions/fetchers";
import { EditProfileFormValues, UserType } from "../types/globals";

export const useEditUser = (): [
  (formValues: EditProfileFormValues) => void,
  {
    isLoading: boolean;
    error: string | null;
    data: { data?: UserType; message?: string } | undefined;
  },
] => {
  const [user, setUser] = useState<EditProfileFormValues | null>(null);
  const editUrl = `${process.env.NEXT_PUBLIC_API_URL}/profile`;
  const shouldFetch = !!user;
  const { data: userData, error: authError } = useSWR(
    () => (shouldFetch ? { url: editUrl, args: user } : null),
    editUserFetcher,
    {
      revalidateOnMount: false,
    },
  );

  useEffect(() => {
    if (userData) {
      setUser(null);
      if (userData.message) {
        toast.error(userData.message);
      }
    }
  }, [userData]);

  useEffect(() => {
    mutate({ url: editUrl, args: user });
  }, [editUrl, user]);

  const handleEdit = (formValues: EditProfileFormValues) => {
    setUser(formValues);
  };

  return [
    handleEdit,
    {
      isLoading: !!user,
      error: authError,
      data: userData,
    },
  ];
};
