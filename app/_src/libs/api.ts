import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { nextTagsRelations, routes } from "../constants";
import { AuthFormValues, EditProfileFormValues } from "../types/globals";

import { decrypt } from "./session";

export const baseFetcher = async (url: string) => {
  const token = (await decrypt(cookies().get("session")?.value))?.userId;
  const response = await fetch(url, {
    headers: {
      "X-API-Key": "" || (token as unknown as string),
    },
    next: {
      tags: [url],
    },
  });

  return response.json();
};

export const basePatchFetcher = async ({ url, args }: { url: string; args: EditProfileFormValues }) => {
  if (!args) {
    return null;
  }

  const token = (await decrypt(cookies().get("session")?.value))?.userId;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": "" || (token as unknown as string),
      },
      body: JSON.stringify(args),
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    revalidateTag(`${nextTagsRelations[url]}/${args.slug}`);

    return response.json();
  } catch (error) {
    return { message: String(error) };
  }
};

export const authFetcher = async ({ url, args }: { url: string; args: AuthFormValues }) => {
  const sessionToken = await decrypt(cookies().get("session")?.value);

  if (sessionToken) {
    redirect(routes.list.path);
  }

  if (!args) {
    return null;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    return response.json();
  } catch (error) {
    return { message: String(error) };
  }
};
