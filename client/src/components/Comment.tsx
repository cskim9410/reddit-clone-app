import dayjs from "dayjs";
import Link from "next/link";
import type { CommentType } from "../types";

interface CommentProps {
  comment: CommentType;
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <div className="py-2 pr-2">
      <p className="mb-1 text-xs leading-none">
        <Link
          href={`/u/${comment.username}`}
          className="mr-1 font-bold hover:underline"
        >
          {comment.username}
        </Link>
        <span className="text-gray-600">
          {`
                                ${comment.voteScore}
                                posts
                                ${dayjs(comment.createdAt).format(
                                  "YYYY-MM-DD HH:mm"
                                )}
                              `}
        </span>
      </p>
      <p>{comment.body}</p>
    </div>
  );
};

export default Comment;
