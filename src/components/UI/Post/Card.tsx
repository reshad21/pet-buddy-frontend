/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { getUserFormAxiois } from "@/services/user";
import { IPost, IUser } from "@/types";
import { convert } from "html-to-text";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";
import FollowComponent from "./FollowComponent";
import UpDownVoteComponent from "./UpDownVoteComponent";

interface PurchasedContent {
  _id: string;
  isPremium: boolean;
}

interface UserData {
  purchasedContent: PurchasedContent[];
  email: string;
  img: string;
  name: string;
  role: string;
}

interface CardProps {
  post: IPost;
  user?: IUser | null; // Make user optional
}

const Card = ({ post, user }: CardProps) => {
  const { _id, author, title, postImage, content, category, isPremium } = post;
  // const { user } = useUser();

  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  // Fetch user data from the database
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?._id) {
        try {
          const response = await getUserFormAxiois(user._id);
          setUserData(response?.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [user?._id]);

  const handleCheckout = async () => {
    await router.push(`/checkout/${_id}`);
  };

  // Determine access to premium content
  const hasAccess =
    !isPremium ||
    (userData?.purchasedContent?.some((content) => content._id === _id) ??
      false);

  // Function to truncate content to a specified word limit
  const truncateContent = (content: string, wordLimit: number) => {
    const plainText = convert(content, { wordwrap: false });
    const words = plainText.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : plainText;
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-fit bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl">
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
        <span className="absolute bottom-2 left-2 bg-blue-800 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
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
          <p>{truncateContent(content, 50)}</p>
        </div>

        <div className="flex items-center">
          <UpDownVoteComponent key={_id} post={post} />

          <button
            className="flex items-center text-blue-900 hover:text-gray-700 transition-all duration-200 mx-2"
            aria-label="Comments"
          >
            <FaComment className="text-lg" />
            <span className="font-medium ml-1">{post.comments.length}</span>
          </button>
        </div>

        {/* Conditional Button for Premium/Non-Premium Posts */}
        <div className="mt-4">
          {isPremium && !hasAccess ? (
            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white font-semibold text-sm py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Checkout
            </button>
          ) : (
            <Link href={`/post/${_id}`} passHref>
              <button className="w-full bg-blue-800 text-white font-semibold text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                See More
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
