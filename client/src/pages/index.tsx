import useSWRInfinite from "swr/infinite";
import type { Post } from "../types";
import PostCard from "../components/PostCard";
import { useEffect, useState, useRef } from "react";
import SubList from "../components/SubList";
import Loading from "./../components/Loading";

const Home = () => {
  const getkey = (pageIndex: number, previousPageData: Post[]) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/posts?page=${pageIndex}`;
  };

  const {
    data,
    isLoading: isPostsLoading,
    size: page,
    setSize: setPage,
    mutate,
  } = useSWRInfinite<Post>(getkey);
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
  }, [posts, observedPost, page, setPage]);

  return (
    <div className="flex max-w-5xl px-4 mt-5 mx-auto">
      <div className="w-full md:mr-3 md:w-8/12">
        {isPostsLoading ? (
          <Loading size="80" minH="30" />
        ) : (
          posts.map((post) => (
            <>
              <div ref={observedPostRef} key={post.identifier}>
                <PostCard post={post} mutate={mutate} />
              </div>
            </>
          ))
        )}
      </div>
      <SubList />
    </div>
  );
};

export default Home;
