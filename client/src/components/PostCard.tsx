import { Post } from "../types";
import VoteUI from "./VoteUI";
import { useAuthState } from "./../context/auth";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";

interface PostCardProps {
  post: Post;
  subMutate?: () => {};
  mutate?: () => {};
}

const PostCard = ({ post, subMutate, mutate }: PostCardProps) => {
  const router = useRouter();
  const isInSubPage = router.pathname === "/r/[sub]";

  const { authenticated } = useAuthState();

  const vote = async (value: number) => {
    if (!authenticated) router.push("/login");

    if (value === post.userVote) value = 0;

    try {
      await axios.post("/votes", {
        identifier: post.identifier,
        slug: post.slug,
        value,
      });
      if (mutate) mutate();
      if (subMutate) subMutate();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex bg-white m-3" id={post.identifier}>
      <VoteUI type={post} vote={vote} />
      <div className="w-full p-2">
        <div className="flex items-center">
          {!isInSubPage && (
            <div className="flex items-center">
              <Link href={`/r/${post.subName}`}>
                <Image
                  src={post.sub!.imageUrl}
                  alt="sub"
                  className="rounded-full cursor-pointer"
                  width={12}
                  height={12}
                />
              </Link>
              <Link
                href={`/r/${post.subName}`}
                className="ml-2 text-xs font-bold cursor-pointer hover:underline"
              >
                /r/{post.subName}
              </Link>
              <span className="mx-1 text-xs text-gray-400">•</span>
            </div>
          )}

          <p className="text-xs text-gray-400">
            Posted by
            <Link href={`/u/${post.username}`} className="mx-1 hover:underline">
              {post.username}
            </Link>
            <Link href={post.url} className="mx-1 hover:underline">
              {dayjs(post.createdAt).format("YYYY-MM-DD HH:mm")}
            </Link>
          </p>
        </div>

        <Link href={post.url} className="my-1 text-lg font-medium">
          {post.title}
        </Link>
        {post.body && <p className="my-1 text-sm">{post.body}</p>}
        <div className="flex">
          <Link href={post.url}>
            <i className="mr-1 fas fa-comment-alt fa-xs"></i>
            <span>{post.commentCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
