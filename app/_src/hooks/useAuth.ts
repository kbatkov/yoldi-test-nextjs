"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { mutate, useSWRConfig } from "swr";

import { login } from "../actions/auth";
import { getUserFetcher } from "../actions/fetchers";
import { AuthEndpoint, AuthFormValues } from "../types/globals";

import { useGetProfileSWR } from "./useGetProfileSWR";

export const useAuth = ({
  endpoint,
}: {
  endpoint: AuthEndpoint;
}): [
  (formValues: AuthFormValues) => void,
  {
    isLoading: boolean;
    error: string | null;
    data: any;
  },
] => {
  const [user, setUser] = useState<AuthFormValues | null>(null);
  const { cache } = useSWRConfig();
  const authUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/${endpoint}`;
  const shouldFetch = !!user;
  const { data: authData, error: authError } = useSWR(
    () => (shouldFetch ? { url: authUrl, args: user } : null),
    getUserFetcher,
    {
      revalidateOnMount: false,
    },
  );
  const { mutate: mutateProfile } = useGetProfileSWR({});

  useEffect(() => {
    if (authData?.value) {
      cache.delete(`${process.env.NEXT_PUBLIC_API_URL}/profile`);
      login(authData.value).then(() => {
        setUser(null);
        mutateProfile();
      });
    } else if (authData?.message) {
      toast.error(authData.message);
      setUser(null);
    }
  }, [authData]);

  useEffect(() => {
    mutate({ url: authUrl, args: user });
  }, [authUrl, user]);

  const handleAuth = (formValues: AuthFormValues) => {
    setUser(formValues);
  };

  return [
    handleAuth,
    {
      isLoading: !!user,
      error: authError,
      data: authData,
    },
  ];
};
