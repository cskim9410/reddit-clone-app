import React from "react";
import useSWR from "swr";
import type { Sub } from "../types";
import Link from "next/link";
import SubItem from "../components/SubItem";
import { useAuthState } from "../context/auth";

const SubList = () => {
  const { authenticated } = useAuthState();

  const { data: topSubs, isLoading } = useSWR<Sub[]>("/subs/sub/topSubs");
  return (
    <div className="hidden w-4/12 ml-3 md:block">
      <div className="border rounded bg-white dark:bg-slate-800 dark:text-slate-100">
        <div className="p-4 border-b">
          <p className="text-center text-lg font-semibold">상위 커뮤니티</p>
        </div>
        <div>
          {topSubs &&
            topSubs.map((sub) => (
              <SubItem
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
  );
};

export default SubList;
