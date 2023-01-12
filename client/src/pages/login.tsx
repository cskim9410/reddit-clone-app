import InputGroup from "../components/InputGroup";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useAuthDispatch } from "../context/auth";
import { ActionKind } from "../context/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const dispatch = useAuthDispatch();
  let router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/auth/login",
        {
          password,
          username,
        },
        { withCredentials: true }
      );
      console.log(res);
      dispatch({ type: ActionKind.LOGIN, payload: res.data?.user });
      router.push("/");
    } catch (err: any) {
      console.log(err);
      setErrors(err.response.data || {});
    }
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96">
          <h1 className="mb-2 text-lg font-medium">로그인</h1>
          <form onSubmit={handleSubmit}>
            <InputGroup
              placeholder="Username"
              type="text"
              value={username}
              setValue={setUsername}
              error={errors.username}
            />
            <InputGroup
              placeholder="password"
              type="text"
              value={password}
              setValue={setPassword}
              error={errors.password}
            />
            <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
              로그인
            </button>
          </form>
          <small>
            아직 아이디가 없나요?
            <Link href="/register" className="ml-1 text-blue-500 uppercase">
              회원가입
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
