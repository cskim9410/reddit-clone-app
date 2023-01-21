import "../styles/globals.css";
import type { AppProps } from "next/app";
import axios, { AxiosError } from "axios";
import AuthProvider from "../context/auth";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import { SWRConfig } from "swr";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  axios.defaults.withCredentials = true;

  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);

  const fetcher = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) throw error.response?.data;
    }
  };

  return (
    <>
      <Script
        src="https://use.fontawesome.com/releases/v6.1.1/js/all.js"
        integrity="sha384-xBXmu0dk1bEoiwd71wOonQLyH+VpgR1XcDH3rtxrLww5ajNTuMvBdL5SOiFZnNdp"
        crossOrigin="anonymous"
      ></Script>
      <SWRConfig value={{ fetcher }}>
        <AuthProvider>
          {!authRoute && <NavBar />}
          <div className={authRoute ? "" : "pt-12 bg-gray-200 min-h-screen"}>
            <Component {...pageProps} />
          </div>
        </AuthProvider>
      </SWRConfig>
    </>
  );
}
