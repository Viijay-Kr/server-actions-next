"use client";
import {
  Fragment,
  experimental_useOptimistic as useOptimistic,
  useRef,
} from "react";
import { addTopicsToUser } from "../actions/user";
import classNames from "classnames";

export default function FavoriteTopics({
  id,
  topics,
}: {
  id: number;
  topics: string[] | null;
}) {
  const [optimisticTopics, addOptimisticTopic] = useOptimistic<
    { topic: string; adding: boolean }[],
    string
  >(
    (topics ?? []).map((t) => ({ topic: t, adding: false })),
    (state, topic) => [...state, { topic, adding: true }]
  );

  const formRef = useRef<HTMLFormElement>(null);

  const addTopics = async (data: FormData) => {
    const topic = (data.get("topics") ?? "") as string;
    formRef.current?.reset();
    addOptimisticTopic(topic);
    await addTopicsToUser(
      JSON.stringify(optimisticTopics.map((t) => t.topic).concat(topic)),
      id
    );
  };

  return (
    <div className="flex flex-col mt-[1rem] gap-[0.25rem]">
      <form action={addTopics} ref={formRef}>
        <input
          type="text"
          name="topics"
          placeholder="Add Topics here"
          className="border border-slate-400 w-full h-[4rem] p-[0.5rem] rounded-md"
        />
        <input type="submit" style={{ display: "none" }} />
        <div className="flex mt-[0.25rem] flex-row gap-[0.25rem]">
          {optimisticTopics.map((t) => (
            <Fragment key={t.topic}>
              <span
                className={classNames(
                  "px-[0.5rem] py-[0.25rem] rounded-lg bg-blue-500 text-slate-100",
                  { ["bg-gray-300 text-black"]: !!t.adding }
                )}
              >
                {t.topic}
              </span>
            </Fragment>
          ))}
        </div>
      </form>
    </div>
  );
}
