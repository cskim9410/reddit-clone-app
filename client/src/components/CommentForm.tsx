import Link from "next/link";
import { useState } from "react";
import { FormEvent } from "react";
import axios from "axios";
import { User } from "../types";

interface CommentFormProps {
  identifier: string | string[] | undefined;
  slug: string | string[] | undefined;
  commentMutate: () => {};
  user: User;
  authenticated: boolean;
}

const CommentForm = ({
  identifier,
  slug,
  commentMutate,
  user,
  authenticated,
}: CommentFormProps) => {
  const [newComment, setNewComment] = useState("");

  const submitComments = async (e: FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") {
      return;
    }

    try {
      await axios.post(`/posts/${identifier}/${slug}/comments`, {
        body: newComment,
      });
      commentMutate();
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pr-6 mb-4 pl-9">
      {authenticated ? (
        <div>
          <p className="mb-1 text-xs">
            <Link
              href={`/u/${user?.username}`}
              className="font-semibold text-blue-500"
            >
              {user?.username}
            </Link>{" "}
            으로 댓글 작성
          </p>
          <form onSubmit={submitComments}>
            <textarea
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-600 dark:bg-slate-800"
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
            ></textarea>
            <div className="flex justify-end p-3">
              <button
                className="px-3 p-1 font-bold text-gray-400 bg-gray-700 dark:bg-gray-400 dark:text-gray-700 rounded-3xl disabled:cursor-not-allowed"
                disabled={newComment.trim() === ""}
              >
                댓글 작성
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex items-center justify-between px-2 py-4 border border-gray-200 rounded">
          <p className="font-semibold text-gray-400">
            댓글 작성을 위해서 로그인 해주세요.
          </p>
          <div>
            <Link
              href={`/login`}
              className="px-3 py-1 text-white bg-gray-400 rounded"
            >
              로그인
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
