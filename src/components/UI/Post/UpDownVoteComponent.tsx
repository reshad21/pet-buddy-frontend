"use client";

import {
  createDownvote,
  createUpvote,
  getDownvote,
  getUpvote,
} from "@/services/Votes";
import { IPost } from "@/types";
import Link from "next/link";
import { FaArrowDown, FaArrowUp, FaComment } from "react-icons/fa";

const UpDownVoteComponent = ({ post }: { post: IPost }) => {
  const handleUpvote = () => {
    // Implement the logic for upvoting here
    console.log(`Upvoted post with ID: ${post._id}`);
    // You can make an API call here to update the upvote count
    createUpvote(post._id);
    getUpvote();
  };

  const handleDownvote = () => {
    // Implement the logic for downvoting here
    console.log(`Downvoted post with ID: ${post._id}`);
    // You can make an API call here to update the downvote count
    createDownvote(post._id);
    getDownvote();
  };

  return (
    <div className="flex items-center justify-between mt-2">
      <div className="flex items-center space-x-3">
        <button
          className="text-green-500 hover:text-green-700"
          onClick={handleUpvote}
        >
          <FaArrowUp />
        </button>
        <span className="text-gray-800">{post.upvotes}</span>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleDownvote}
        >
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
