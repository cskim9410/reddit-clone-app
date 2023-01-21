import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import useSWR from "swr";
import PostCard from "../../components/PostCard";
import { CommentType, Post } from "../../types";

interface UserData {
  user: { createdAt: string; username: string };
  posts: Post[];
  comments: CommentType[];
}

const UserPage = () => {
  const router = useRouter();
  const username = router.query.username;

  const { data: user, error } = useSWR<UserData>(
    username ? `/user/${username}` : null
  );
  console.log(user);

  return (
    <Fragment>
      {user && (
        <div className="flex max-w-5xl px-4 pt-5 mx-auto">
          <div className="w-full md:mr-3 md:w-8/12">
            {user.posts &&
              user.posts.map((post) => (
                <PostCard key={post.identifier} post={post} />
              ))}
            {user.comments &&
              user.comments.map((comment) => (
                <div
                  key={comment.identifier}
                  className="flex my-4 bg-white rounded"
                >
                  <div className="flex-shrink-0 w-10 py-10 text-center bg-white border-r rounded-l">
                    <i className="text-gray-500 fas fa-comment-alt fa-xs"></i>
                  </div>
                  <div className="p-2 w-full">
                    <p className="mb-2 text-xs text-gray-500">
                      <Link
                        href={`/u/${comment.username}`}
                        className="cursor-pointer hover:underline"
                      >
                        {`${comment.username} `}
                      </Link>
                      <span>commented on </span>
                      <Link
                        href={`${comment.post?.url}`}
                        className="cursor-pointer font-semibold hover:underline"
                      >
                        {comment.post?.title}
                      </Link>
                      <span className="mx-1 text-xs text-gray-400">•</span>
                      <Link
                        href={`/r/${comment.post?.subName}`}
                        className="cursor-pointer text-black hover:underline"
                      >
                        {comment.post?.subName}
                      </Link>
                    </p>
                    <hr />
                    <p className="p-1">{comment.body}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="hidden w-4/12 ml-3 md:block">
            <div className="flex items-center p-3 bg-gray-400 rounded-t">
              <Image
                src={process.env.NEXT_PUBLIC_AVATAR_URL!}
                alt="user profile"
                className="border border-white rounded-full"
                width={40}
                height={40}
              />
              <p className="pl-2 text-md">{user.user.username}</p>
            </div>
            <div className="bg-white rounded-b p-3">
              <p>{dayjs(user.user.createdAt).format("YYYY.MM.DD")} 가입</p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserPage;
