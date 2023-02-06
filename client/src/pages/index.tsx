import useSWRInfinite from "swr/infinite";
import type { Post } from "../types";
import PostCard from "../components/PostCard";
import { useEffect, useState, useRef } from "react";
import SkeletonUI from "../components/Skeleton";
import SubList from "../components/SubList";

const Home = () => {
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

  return (
    <div className="flex max-w-5xl px-4 mt-5 mx-auto">
      <div className="w-full md:mr-3 md:w-8/12">
        {isPostsLoading ? (
          <SkeletonUI />
        ) : (
          posts.map((post) => (
            <div>
              <div ref={observedPostRef} key={post.identifier}>
                <PostCard post={post} mutate={mutate} />
              </div>
            </div>
          ))
        )}
      </div>
      <SubList />
    </div>
  );
};

export default Home;

// SSG 렌더링 방식 코드

// export const getStaticProps: GetStaticProps = async () => {
//   const getSubItems = async () => {
//     const res = await axios.get("/subs/sub/topSubs");
//     const subItems: Sub[] = await res.data;
//     return subItems;
//   };
//   const getPostItems = async () => {
//     const res = await axios.get("/posts");
//     const postItems: Post[] = await res.data;
//     return postItems;
//   };

//   const [postItems, subItems] = await Promise.all([
//     getPostItems(),
//     getSubItems(),
//   ]);

//   return {
//     props: {
//       fallback: {
//         postItems,
//         subItems,
//       },
//     },
//   };
// };
