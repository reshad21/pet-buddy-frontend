import { IPost } from "@/types";
import Link from "next/link";
import { FaArrowDown, FaArrowUp, FaComment } from "react-icons/fa";

const UpDownVoteComponent = ({ post }: { post: IPost }) => {
  return (
    <div className="flex items-center justify-between mt-2">
      <div className="flex items-center space-x-3">
        <button className="text-green-500 hover:text-green-700">
          <FaArrowUp />
        </button>
        <span className="text-gray-800">{post.upvotes}</span>
        <button className="text-red-500 hover:text-red-700">
          <FaArrowDown />
        </button>
        <span className="text-gray-800">{post.downvotes}</span>
        <button className="ml-4 text-gray-600 hover:text-gray-800 flex items-center">
          <FaComment className="mr-1" />
          <span>{post.comments.length}</span>
        </button>
      </div>
      <Link
        href={`/post/${post._id}`}
        className="text-blue-600 hover:text-blue-800 font-semibold"
      >
        See More
      </Link>
    </div>
  );
};

export default UpDownVoteComponent;
