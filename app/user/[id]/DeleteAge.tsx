"use client";

import classNames from "classnames";

export default function DeleteAge({
  deleteAge,
}: {
  deleteAge: () => Promise<void>;
}) {
  return (
    <button
      className={classNames(
        "bg-blue-500 rounded-md p-[0.5rem] mt-[1rem] text-slate-50 w-1/4 hover:bg-blue-400 cursor-pointer"
      )}
      onClick={() => deleteAge()}
    >
      Delete Age
    </button>
  );
}
