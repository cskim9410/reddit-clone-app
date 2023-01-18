import Link from "next/link";
import { ActionKind, useAuthDispatch, useAuthState } from "./../context/auth";
import axios from "axios";
const NavBar = () => {
  const { loading, authenticated } = useAuthState();
  const dispatch = useAuthDispatch();

  const handleLogout = () => {
    axios
      .post("/auth/logout")
      .then(() => {
        dispatch({ type: ActionKind.LOGOUT });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="fixed inset-0 top-0 z-10 flex items-center justify-between bg-white h-16 px-5">
      <span>
        <Link href="/">로고</Link>
      </span>
      <div className="max-w-full px-4">
        <div className="relative flex items-center bg-gray-100 border rounded hover:border-gray-700 hover:bg-white">
          <i className="pl-4 pr-3 text-gray-400 fas fa-search"></i>
          <input
            placeholder="Search"
            type="text"
            className="px-3 py-1 bg-transparent rounded focus:outline-none"
          />
        </div>
      </div>
      <div>
        {!loading &&
          (authenticated ? (
            <button
              className="w-21 p-2 mr-2 text-center border text-white rounded bg-gray-400"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="w-20 p-2 mr-2 text-center border text-blue-500 rounded border-blue-500"
              >
                로그인
              </Link>
              <Link
                href="/register"
                className="w-20 p-2 text-center border text-white rounded bg-gray-400"
              >
                회원가입
              </Link>
            </>
          ))}
      </div>
    </div>
  );
};

export default NavBar;
