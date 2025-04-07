"use server";

import { signIn } from "@/lib/auth";

export async function HandleRegister(Provider: string) {
  await signIn(Provider, { redirectTo: "/dashboard" });
}
