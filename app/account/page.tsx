"use client";

import useSWR from "swr";

import { logout } from "@/_src/actions/auth";
import { getProfileFetcher } from "@/_src/actions/fetchers";
import { Button } from "@/_src/components/items";

const Account = () => {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/profile`, getProfileFetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div>Account protected</div>
      <Button
        onClick={() => {
          logout();
        }}
      >
        Выйти
      </Button>
    </>
  );
};

export default Account;
