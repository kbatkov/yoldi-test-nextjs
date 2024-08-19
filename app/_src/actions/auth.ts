"use server";

import { redirect } from "next/navigation";

import { routes } from "../constants/routes";
import { createSession, deleteSession } from "../libs/session";

export async function logout() {
  await deleteSession();
  redirect(routes.login.path);
}

export async function login(userId: string) {
  await createSession(userId);
  redirect(routes.account.path);
}
