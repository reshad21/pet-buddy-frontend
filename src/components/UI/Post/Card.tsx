import Image from "next/image";
import Link from "next/link";
import { FaArrowDown, FaArrowUp, FaComment } from "react-icons/fa";

const Card = ({}) => {
  const postId = "123"; // Replace with actual post ID

  const imageUrl =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  const authorImageUrl =
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"; // Replace with actual author image URL
  const authorName = "John Doe"; // Replace with actual author name
  const authorEmail = "johndoe@example.com"; // Replace with actual author email

  return (
    <div className="flex flex-col md:flex-row w-full bg-white shadow-md rounded-lg overflow-hidden">
      {/* Left Side: Image */}
      <div className="md:w-1/3 relative h-48 md:h-auto">
        <Image
          src={imageUrl}
          alt="Card Image"
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg md:rounded-l-lg"
          priority
        />
        {/* Premium Badge */}
        <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
          Premium
        </span>
      </div>

      {/* Right Side: Content */}
      <div className="md:w-2/3 p-4 flex flex-col justify-between">
        {/* Author Information */}
        <div className="flex items-center justify-between mb-4 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 relative">
              <Image
                src={authorImageUrl}
                alt="Author Image"
                layout="fill"
                objectFit="cover"
                className="rounded-full border border-gray-300"
              />
            </div>
            <div className="ml-4">
              <h4 className="text-base font-medium text-gray-800">
                {authorName}
              </h4>
              <p className="text-xs text-gray-500">{authorEmail}</p>
            </div>
          </div>
          <button className="bg-blue-500 text-white text-sm py-1 px-4 rounded-full hover:bg-blue-600 transition duration-300 ml-4">
            Follow
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Card Title</h2>
          <p className="text-gray-600 mb-4">
            This is a brief description of the content. It should be short and
            informative to give users a quick idea about what the card is about.
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-3">
            <button className="text-green-500 hover:text-green-700">
              <FaArrowUp />
            </button>
            <span className="text-gray-800">12</span>
            <button className="text-red-500 hover:text-red-700">
              <FaArrowDown />
            </button>
            <button className="ml-4 text-gray-600 hover:text-gray-800 flex items-center">
              <FaComment className="mr-1" />
              <span>5</span>
            </button>
          </div>
          <Link
            href={`/details-post/${postId}`}
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
