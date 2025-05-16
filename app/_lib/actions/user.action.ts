"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserType } from "../schema/user.type";
import setUserToCookie from "../utils/setUserToCookie";

export type ResponseType = {
  success: boolean;
  prevState: { username: string, userpassword: string },
  errors: { username: string, userpassword: string }
} | null

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const logout = async function () {
  console.log("llego")
  const cookie = await cookies()
  cookie.delete("usertoken")
  redirect("/")
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const login = async function (loginUser: UserType) {

  const { username } = loginUser

  await setUserToCookie(username, "01")
  redirect("/pendientes")
}