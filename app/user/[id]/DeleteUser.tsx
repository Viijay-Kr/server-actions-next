"use client";
import { useTransition } from "react";
import { deleteUser } from "../actions/user";
import classNames from "classnames";
export default function DeleteUser({ id }: { id: number }) {
  let [isPending, startTransition] = useTransition();

  return (
    <button
      className={classNames(
        "bg-red-600 rounded-md p-[0.5rem] mt-[1rem] text-slate-50 w-1/4 hover:bg-red-400 cursor-pointer"
      )}
      onClick={() => startTransition(() => deleteUser(id))}
    >
      {isPending ? "Deleting ..." : "Delete user"}
    </button>
  );
}
