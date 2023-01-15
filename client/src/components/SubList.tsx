import Image from "next/image";
import Link from "next/link";

interface SubListProps {
  imgUrl: string;
  subName: string;
  postCount: string;
}

const SubList = ({ imgUrl, subName, postCount }: SubListProps) => {
  return (
    <div className="flex items-center px-4 py-2 text-xs border-b">
      <Link href={`/r/${subName}`}>
        <Image
          className="rounded-full cursor-pointer"
          src={imgUrl}
          alt="community-image"
          width={24}
          height={24}
        />
      </Link>
      <Link className="ml-2 font-bold cursor-pointer" href={`/r/${subName}`}>
        /r/{subName}
      </Link>
      <p className="ml-auto font-md">{postCount}</p>
    </div>
  );
};

export default SubList;
