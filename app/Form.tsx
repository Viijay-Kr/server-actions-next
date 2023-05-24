import { query } from "./db";
import { redirect } from "next/navigation";

export default function CreateUser() {
  const action = async function (data: FormData) {
    "use server";
    const name = data.get("name");
    const email = data.get("email");
    const age = parseInt((data.get("age") ?? "") as string, 10);
    const result = await query(
      `INSERT INTO 
        users (name, email, age) 
        VALUES ('${name}','${email}','${age}')`
    );
    redirect(`/user/${result.insertId}`);
  };

  return (
    <div className="flex flex-col gap-[1] items-center">
      <h3 className="border-b p-[1rem] text-center">Create User</h3>
      <form
        title="Create User"
        action={action}
        className="flex flex-col gap-[0.5rem]"
      >
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
          value="Submit"
          name="SubmitButton"
          className="bg-blue-600 hover:scale-105 transition-all cursor-pointer text-white p-[0.5rem] rounded"
        />
      </form>
    </div>
  );
}
