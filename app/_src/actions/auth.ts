"use server";

import { permanentRedirect } from "next/navigation";

import { routes } from "../constants/routes";
import { createSession, deleteSession } from "../libs/session";

export async function logout() {
  await deleteSession();
  permanentRedirect(routes.login.path);
}

export async function login(userId: string) {
  await createSession(userId);
  permanentRedirect(routes.list.path);
}
