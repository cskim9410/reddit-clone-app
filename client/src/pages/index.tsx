import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex max-w-5xl px-4 mt-5 mx-auto">
      <div className="w-full md:mr-3 md:w-8/12"></div>
      <div className="hidden w-4/12 ml-3 md:block">
        <div className="border rounded bg-white">
          <div className="p-4 border-b">
            <p className="text-center text-lg font-semibold">상위 커뮤니티</p>
          </div>
          <div></div>
          <div className="w-full py-6 text-center">
            <Link
              href="/subs/create"
              className="w-full p-2 text-center bg-gray-400 text-white rounded"
            >
              커뮤니티 만들기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
