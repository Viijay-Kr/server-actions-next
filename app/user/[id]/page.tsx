import { query } from "@/app/db";
import DeleteUser from "./DeleteUser";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import DeleteAge from "./DeleteAge";
import FavoriteTopics from "./FavoriteTopics";

export const getUser = async (id: string) => {
  const result = await query<
    [
      {
        id: number;
        name: string;
        email: string;
        age: number;
        topics: string;
      }
    ]
  >(`select * from users where id=${id}`);

  if (!result.length) {
    redirect("/404");
  }
  return result[0];
};

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  const deleteAge = async function () {
    "use server";
    const result = await query<{ affectedRows: number }>(
      `UPDATE users SET age = NULL WHERE id=${params.id}`
    );
    if (result.affectedRows) {
      revalidatePath(`/user/${params.id}`);
    }
  };
  console.log(user.topics);
  return (
    <div className="flex flex-col px-[4rem]">
      <h2>Name: {user.name}</h2>
      <h3>Email: {user.email}</h3>
      <h4>Age: {user.age}</h4>
      <DeleteUser id={user.id} />
      <DeleteAge deleteAge={deleteAge} />
      <FavoriteTopics id={user.id} topics={JSON.parse(user.topics)} />
    </div>
  );
}
