import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { routes } from "../constants/routes";
import { AuthFormValues } from "../types/globals";

import { decrypt } from "./session";

export const baseFetcher = async (url: string) => {
  const token = (await decrypt(cookies().get("session")?.value))?.userId;
  const response = await fetch(url, {
    headers: {
      "X-API-Key": "" || (token as unknown as string),
    },
  });

  if (response.status === 401) {
    redirect(routes.login.path);
  }

  return response.json();
};

export const authFetcher = async ({ url, args }: { url: string; args: AuthFormValues }) => {
  const sessionToken = await decrypt(cookies().get("session")?.value);

  console.log(url);
  console.log(args);

  if (sessionToken) {
    redirect(routes.account.path);
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
