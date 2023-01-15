import styles from "../styles/Home.module.css";
import Link from "next/link";
import useSWR from "swr";
import type { Sub } from "../types";
import axios from "axios";
import SubList from "../components/SubList";
import { useAuthState } from "../context/auth";

const Home = () => {
  const fetcher = async (url: string) => {
    return await axios.get(url).then((res) => res.data);
  };
  const address = "http://localhost:4000/api/subs/sub/topSubs";
  const { data: topSubs } = useSWR<Sub[]>(address, fetcher);
  const { authenticacted } = useAuthState();

  return (
    <div className="flex max-w-5xl px-4 mt-5 mx-auto">
      <div className="w-full md:mr-3 md:w-8/12"></div>
      <div className="hidden w-4/12 ml-3 md:block">
        <div className="border rounded bg-white">
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
          {authenticacted && (
            <div className="w-full py-6 text-center">
              <Link
                href="/subs/create"
                className="w-full p-2 text-center bg-gray-400 text-white rounded"
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
