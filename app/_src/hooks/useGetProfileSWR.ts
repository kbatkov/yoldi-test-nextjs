import useSWR from "swr";

import { getProfileFetcher } from "../actions/fetchers";
import { UserType } from "../types";

export const useGetProfileSWR = ({ shouldFetch = true }: { shouldFetch?: boolean }) => {
  const { data, error, mutate, isLoading } = useSWR<UserType & { error: string; message: string; statusCode: number }>(
    shouldFetch ? `${process.env.NEXT_PUBLIC_API_URL}/profile` : null,
    getProfileFetcher,
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
