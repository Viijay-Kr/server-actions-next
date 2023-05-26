import CreateUserForm from "./CreateUserForm";
import { query } from "./db";
import { redirect } from "next/navigation";

export default function CreateUser() {
  const action = async function (data: FormData) {
    "use server";
    const name = data.get("name");
    const email = data.get("email");
    const age = parseInt((data.get("age") ?? "") as string, 10);
    const result = await query<{ insertId: number }>(
      `INSERT INTO 
        users (name, email, age) 
        VALUES ('${name}','${email}','${age}')`
    );
    if (result.insertId) {
      redirect(`/user/${result.insertId}`);
    }
  };

  return (
    <div className="flex flex-col gap-[1] items-center">
      <h3 className="border-b p-[1rem] text-center font-semibold">
        Create User
      </h3>
      <form
        title="Create User"
        action={action}
        className="flex flex-col gap-[0.5rem]"
      >
        <CreateUserForm />
      </form>
    </div>
  );
}
