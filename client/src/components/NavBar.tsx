import Link from "next/link";
import { ActionKind, useAuthDispatch, useAuthState } from "./../context/auth";
import axios from "axios";
import Image from "next/image";
import { DarkCtx } from "../context/dark";
import { useContext, useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
const NavBar = () => {
  const { loading, authenticated } = useAuthState();
  const dispatch = useAuthDispatch();
  const { darkMode, toggleDarkMode } = useContext(DarkCtx);

  const handleLogout = () => {
    axios
      .post("/auth/logout")
      .then(() => {
        dispatch({ type: ActionKind.LOGOUT });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="fixed inset-0 top-0 z-10 flex items-center justify-between bg-white dark:bg-slate-800 h-14 px-5">
      <span>
        <Link href="/">
          <Image
            src={darkMode ? "/reddit-logo-dark.png" : "/reddit-logo.png"}
            alt="logo"
            width={130}
            height={65}
          />
        </Link>
      </span>
      {/* <div className="max-w-full px-4">
        <div className="relative flex items-center bg-gray-100 border rounded hover:border-gray-700 hover:bg-white dark:bg-slate-800">
          <i className="pl-4 pr-3 text-gray-400 fas fa-search"></i>

          <input
            placeholder="Search Reddit"
            type="text"
            className="px-3 py-1 bg-transparent h-7 rounded focus:outline-none dark:text-slate-100"
          />
        </div>
      </div> */}
      <button onClick={toggleDarkMode}>
        <div className="text-confirm-blue hover:scale-110 p-2 rounded-full">
          {darkMode ? <BsMoon size={24} /> : <BsSun size={24} />}
        </div>
      </button>
      <div>
        {!loading &&
          (authenticated ? (
            <button
              className="w-24 px-2 p-2 mr-2 text-center text-white rounded-3xl  bg-gray-700 dark:bg-gray-400 dark:text-gray-700 font-bold"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          ) : (
            <div className="flex">
              <Link href="/login">
                <div className="w-24 px-2 p-2 mr-2 text-center  rounded-3xl font-bold bg-confirm-blue text-white ">
                  로그인
                </div>
              </Link>
              <Link href="/register">
                <div className="w-24 px-2 p-2 mr-2 text-center text-white rounded-3xl  bg-gray-700 dark:bg-gray-400 dark:text-gray-700 font-bold ">
                  회원가입
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NavBar;
