import { IPost } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaArrowDown, FaArrowUp, FaComment } from "react-icons/fa";

const Card = ({ post }: { post: IPost }) => {
  const {
    _id,
    author,
    title,
    postImage,
    content,
    category,
    isPremium,
    upvotes,
    downvotes,
    comments,
  } = post;

  return (
    <div className="flex flex-col md:flex-row w-full bg-white shadow-md rounded-lg overflow-hidden">
      {/* Left Side: Image */}
      <div className="md:w-1/3 relative h-48 md:h-auto">
        {postImage && (
          <Image
            src={postImage}
            alt="Card Image"
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg md:rounded-l-lg"
            priority
          />
        )}

        {/* Premium Badge */}
        {isPremium && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Premium
          </span>
        )}
      </div>

      {/* Right Side: Content */}
      <div className="md:w-2/3 p-4 flex flex-col justify-between">
        {/* Author Information */}
        <div className="flex items-center justify-between mb-4 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 relative">
              <Image
                src={author.img}
                alt="Author Image"
                layout="fill"
                objectFit="cover"
                className="rounded-full border border-gray-300"
              />
            </div>
            <div className="ml-4">
              <h4 className="text-base font-medium text-gray-800">
                {author.name}
              </h4>
              <p className="text-xs text-gray-500">{author.email}</p>
            </div>
          </div>
          <button className="bg-blue-500 text-white text-sm py-1 px-4 rounded-full hover:bg-blue-600 transition duration-300 ml-4">
            Follow
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{content}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-3">
            <button className="text-green-500 hover:text-green-700">
              <FaArrowUp />
            </button>
            <span className="text-gray-800">{upvotes}</span>
            <button className="text-red-500 hover:text-red-700">
              <FaArrowDown />
            </button>
            <span className="text-gray-800">{downvotes}</span>
            <button className="ml-4 text-gray-600 hover:text-gray-800 flex items-center">
              <FaComment className="mr-1" />
              <span>{comments.length}</span>
            </button>
          </div>
          <Link
            href={`/details-post/${_id}`}
            passHref
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
