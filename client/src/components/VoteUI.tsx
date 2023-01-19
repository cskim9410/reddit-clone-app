import type { CommentType, Post } from "../types";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { useRouter } from "next/router";
import { useAuthState } from "./../context/auth";

interface VoteUIProps {
  type: CommentType | Post;
  vote: (value: number, comment?: CommentType) => {};
}

const VoteUI = ({ type, vote }: VoteUIProps) => {
  const router = useRouter();

  const isPost = (type: CommentType | Post): type is Post => {
    return (type as Post).title !== undefined;
  };

  const clickVote = (value: number) => {
    if (isPost(type)) {
      vote(value);
    } else {
      vote(value, type);
    }
  };

  return (
    <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
      {/* 좋아요 */}
      <div
        className="flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
        onClick={() => clickVote(1)}
      >
        {type.userVote === 1 ? (
          <FaArrowUp className="text-red-500" />
        ) : (
          <FaArrowUp />
        )}
      </div>
      <p className="text-xs font-bold">{type.voteScore}</p>
      {/* 싫어요 */}
      <div
        className="flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500"
        onClick={() => clickVote(-1)}
      >
        {type.userVote === -1 ? (
          <FaArrowDown className="text-blue-500" />
        ) : (
          <FaArrowDown />
        )}
      </div>
    </div>
  );
};

export default VoteUI;
