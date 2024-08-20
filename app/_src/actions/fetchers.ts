"use server";

import { BareFetcher } from "swr";

import { authFetcher, baseFetcher, basePatchFetcher } from "../libs";
import { AuthFormValues, EditProfileFormValues, UserType } from "../types/globals";

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

export const editUserFetcher: BareFetcher<{ message?: string } & UserType> = async ({
  url,
  args,
}: {
  url: string;
  args: EditProfileFormValues;
}) => {
  const data = await basePatchFetcher({
    url: url,
    args: args,
  });
  return data.message ? data : { data: data };
};
