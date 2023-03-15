interface LoadingProps {
  size: string;
  minH: string;
}

const Loading = ({ size, minH }: LoadingProps) => {
  return (
    <div style={{ minHeight: `${minH}vh` }} className="flex items-center">
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 mx-auto`}
      ></div>
    </div>
  );
};

export default Loading;
