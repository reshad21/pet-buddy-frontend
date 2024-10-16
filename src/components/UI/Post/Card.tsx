import { IPost } from "@/types";
import Image from "next/image";
import Link from "next/link";
import FollowComponent from "./FollowComponent";
import UpDownVoteComponent from "./UpDownVoteComponent";

const Card = ({ post }: { post: IPost }) => {
  const { _id, author, title, postImage, content, category, isPremium } = post;

  return (
    <div className="flex flex-col md:flex-row w-full bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:-translate-y-1 hover:shadow-xl duration-300">
      {/* Left Side: Image */}
      <div className="md:w-1/3 relative h-48 md:h-auto">
        {postImage && (
          <Image
            src={postImage}
            alt="Card Image"
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg md:rounded-none md:rounded-l-lg"
            priority
          />
        )}

        {/* Premium Badge */}
        {isPremium && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            Premium
          </span>
        )}

        {/* Category Badge */}
        <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {category}
        </span>
      </div>

      {/* Right Side: Content */}
      <div className="md:w-2/3 p-6 flex flex-col justify-between">
        {/* Author Information */}
        <div className="flex items-center justify-between mb-4">
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
              <h4 className="text-base font-medium text-gray-900">
                {author.name}
              </h4>
              <p className="text-xs text-gray-500">{author.email}</p>
            </div>
          </div>
          <FollowComponent author={author} />
        </div>

        {/* Post Title and Content */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition duration-300">
            {title}
          </h2>
          <p className="text-gray-700 line-clamp-3 mb-4">{content}</p>
        </div>

        {/* Up/Down Vote Component */}
        <UpDownVoteComponent key={_id} post={post} />

        {/* Conditional Button for Premium/Non-Premium Posts */}
        <div className="mt-4">
          <Link href={isPremium ? `/checkout/${_id}` : `/post/${_id}`} passHref>
            <button
              className={`w-full ${
                isPremium ? "bg-green-600" : "bg-blue-600"
              } text-white font-semibold text-sm py-2 px-4 rounded-lg hover:${
                isPremium ? "bg-green-700" : "bg-blue-700"
              } transition duration-300`}
            >
              {isPremium ? "Checkout" : "See More"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
