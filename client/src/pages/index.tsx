import Link from "next/link";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import type { Post, Sub } from "../types";
import SubList from "../components/SubList";
import { useAuthState } from "../context/auth";
import PostCard from "../components/PostCard";
import { useEffect, useState, useRef } from "react";

const Home = () => {
  const { data: topSubs, isLoading: isTobSubsLoading } =
    useSWR<Sub[]>("/subs/sub/topSubs");

  const getkey = (pageIndex: number, previousPageData: Post[]) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/posts?page=${pageIndex}`;
  };

  const {
    data,
    error,
    isLoading: isPostsLoading,
    size: page,
    setSize: setPage,
    isValidating,
    mutate,
  } = useSWRInfinite<Post>(getkey);
  const isInitialLoading = !data && !error;
  const posts: Post[] = data ? ([] as Post[]).concat(...data) : [];
  const [observedPost, setObservedPost] = useState("");
  const observedPostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!posts || posts.length === 0) return;
    const id = posts[posts.length - 1].identifier;
    if (id !== observedPost) {
      setObservedPost(id);
      const observeElement = (element: HTMLElement | null) => {
        if (!element) return;
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting === true) {
              console.log("마지막 페이지");
              setPage(page + 1);
              observer.unobserve(element);
            }
          },
          { threshold: 0.4 }
        );
        observer.observe(element);
      };
      observeElement(observedPostRef.current);
    }
  }, [posts]);

  const { authenticated } = useAuthState();

  return (
    <div className="flex max-w-5xl px-4 mt-5 mx-auto">
      <div className="w-full md:mr-3 md:w-8/12">
        {posts &&
          posts.map((post) => (
            <div ref={observedPostRef} key={post.identifier}>
              <PostCard post={post} mutate={mutate} />
            </div>
          ))}
      </div>
      <div className="hidden w-4/12 ml-3 md:block">
        <div className="border rounded bg-white dark:bg-slate-800 dark:text-slate-100">
          <div className="p-4 border-b">
            <p className="text-center text-lg font-semibold">상위 커뮤니티</p>
          </div>
          <div>
            {topSubs &&
              topSubs.map((sub) => (
                <SubList
                  key={sub.name}
                  imgUrl={sub.imageUrl}
                  subName={sub.name}
                  postCount={sub.postCount}
                />
              ))}
          </div>
          {authenticated && (
            <div className="w-full py-6 text-center">
              <Link
                href="/subs/create"
                className="w-full py-2 px-14 text-center bg-confirm-blue text-white font-bold rounded-3xl"
              >
                커뮤니티 만들기
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
