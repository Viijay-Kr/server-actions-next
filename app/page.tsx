import Image from "next/image";
import CreateUser from "./Form";

export default function Home() {
  return (
    <main className="flex min-h-screen m-[1rem] flex-col">
      <CreateUser />
    </main>
  );
}
