import { baseFetcher } from "../libs";
import { UserType } from "../types";

export const getUser = async ({ slug }: { slug: string }): Promise<UserType> => {
  return await baseFetcher(`${process.env.NEXT_PUBLIC_API_URL}/user/${slug}`);
};

export const getList = async (): Promise<UserType[]> => {
  return await baseFetcher(`${process.env.NEXT_PUBLIC_API_URL}/user`);
};
