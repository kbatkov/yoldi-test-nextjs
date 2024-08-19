"use server";

import { BareFetcher } from "swr";

import { authFetcher, baseFetcher } from "../libs";
import { AuthFormValues } from "../types/globals";

export const getProfileFetcher = async (url: string) => {
  const response = await baseFetcher(url);

  return response;
};

export const getUserFetcher: BareFetcher<{ value?: string; message?: string }> = async ({
  url,
  args,
}: {
  url: string;
  args: AuthFormValues;
}) => {
  const data = await authFetcher({
    url: url,
    args: args,
  });
  return data;
};
