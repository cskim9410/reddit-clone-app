import Image from "next/image";
import Link from "next/link";

interface SubItemProps {
  imgUrl: string;
  subName: string;
  postCount: string;
}

const SubItem = ({ imgUrl, subName, postCount }: SubItemProps) => {
  return (
    <div className="flex items-center px-4 py-2 text-xs border-b">
      <Link href={`/r/${subName}`}>
        <Image
          className="rounded-full cursor-pointer"
          src={imgUrl}
          alt="community-image"
          width={24}
          height={24}
          // style={{ width: "100%", height: "100%" }}
        />
      </Link>
      <Link className="ml-2 font-bold cursor-pointer" href={`/r/${subName}`}>
        /r/{subName}
      </Link>
      <p className="ml-auto font-md">{postCount}</p>
    </div>
  );
};

export default SubItem;
