"use server";

import { signIn } from "@/lib/auth";

type LoginProps = "google" | "github";

export async function HandleRegister(Provider: LoginProps) {
  await signIn(Provider, { redirectTo: "/dashboard" });
}
