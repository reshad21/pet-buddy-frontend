import Image from "next/image";
import Link from "next/link";
import { FaArrowDown, FaArrowUp, FaComment } from "react-icons/fa";

const Card = () => {
  const postId = "123"; // Replace with actual post ID

  const imageUrl =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  return (
    <div className="flex w-full bg-white shadow-md rounded-lg overflow-hidden">
      {/* Left Side: Image */}
      <div className="w-1/3 relative">
        <Image
          src={imageUrl}
          alt="Card Image"
          layout="fill"
          objectFit="cover"
          className="rounded-l-lg"
          priority
        />
      </div>

      {/* Right Side: Content */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
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
