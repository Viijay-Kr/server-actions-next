"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function CreateUserForm() {
  const { pending } = useFormStatus();

  return (
    <>
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="border border-slate-400 p-[0.5rem] rounded-md"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border border-slate-400 p-[0.5rem] rounded-md"
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        className="border border-slate-400 p-[0.5rem] rounded-md"
      />
      <input
        type="submit"
        value={pending ? "Creating User..." : "Create"}
        name="SubmitButton"
        className="bg-blue-600 hover:scale-105 transition-all cursor-pointer text-white p-[0.5rem] rounded"
      />
    </>
  );
}
