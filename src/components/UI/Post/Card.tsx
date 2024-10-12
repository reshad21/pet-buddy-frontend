import { IPost } from "@/types";
import Image from "next/image";
import FollowComponent from "./FollowComponent";
import UpDownVoteComponent from "./UpDownVoteComponent";

const Card = ({ post }: { post: IPost }) => {
  const {
    _id,
    author,
    title,
    postImage,
    content,
    category,
    isPremium,
    // upvotes,
    // downvotes,
    // comments,
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

        {/* Category Badge */}
        <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {category}
        </span>
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
          <FollowComponent author={author} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{content}</p>
        </div>
        <UpDownVoteComponent key={_id} post={post} />
      </div>
    </div>
  );
};

export default Card;
