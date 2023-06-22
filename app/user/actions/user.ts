"use server";

import { query } from "@/app/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteUser = async (id: number) => {
  const result = await query<{ affectedRows: number }>(
    `DELETE FROM users WHERE id=${id}`
  );
  return result.affectedRows;
};

export const addTopicsToUser = async (topics: string, id: number) => {
  await query(`UPDATE users SET topics = '${topics}' WHERE id=${id}`);
  revalidatePath(`/users/${id}`);
};
