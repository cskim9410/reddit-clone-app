import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";

const SubPage = () => {
  const fetcher = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) throw error.response?.data;
    }
  };
  const router = useRouter();
  const subName = router.query.sub;
  const { data: sub, error } = useSWR(
    subName ? `sub/${subName}` : null,
    fetcher
  );
  return (
    <>
      {sub && (
        <>
          <div>
            <div className="bg-gray-400">
              {sub.bannerUrl ? (
                <div
                  className="h-56"
                  style={{
                    backgroundImage: `url(${sub.bannerUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              ) : (
                <div className="h-20 bg-gray-400"></div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SubPage;
