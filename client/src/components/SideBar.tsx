import dayjs from "dayjs";
import Link from "next/link";
import { useAuthState } from "../context/auth";
import { Sub } from "../types";

const SideBar = ({ sub }: { sub: Sub }) => {
  const { authenticated } = useAuthState();
  return (
    <div className="hidden w-4/12 ml-3 md:block">
      <div className="bg-white border dark:border-gray-500 rounded dark:bg-slate-800 dark:text-slate-100">
        <div className="p-3 bg-confirm-blue rounded-t">
          <p className="font-semibold text-white">커뮤니티에 대해서</p>
        </div>
        <div className="p-3">
          <p className="mb-3 text-base">{sub.description}</p>
          <div className="flex mb-3 text-sm font-medium">
            <div className="w-1/2">
              <p>100</p>
              <p>멤버</p>
            </div>
          </div>
          <p className="my-3">{dayjs(sub.createdAt).format("MM.DD.YYYY")}</p>
          {authenticated && (
            <div className="mx-0 my-2 text-center">
              <Link
                href={`/r/${sub.name}/create`}
                className="w-full py-2 px-14 text font-bold text-white bg-confirm-blue rounded-3xl"
              >
                포스트 생성
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
