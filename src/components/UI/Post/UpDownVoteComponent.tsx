"use client";

import {
  createDownvote,
  createUpvote,
  getDownvote,
  getUpvote,
} from "@/services/Votes";
import { IPost } from "@/types";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
// , FaComment
const UpDownVoteComponent = ({ post }: { post: IPost }) => {
  const handleUpvote = () => {
    console.log(`Upvoted post with ID: ${post._id}`);
    createUpvote(post._id);
    getUpvote();
  };

  const handleDownvote = () => {
    console.log(`Downvoted post with ID: ${post._id}`);
    createDownvote(post._id);
    getDownvote();
  };

  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex">
        <div className="flex items-center">
          <button
            className="p-1 text-gray-600 hover:text-gray-700 transition-all duration-200"
            onClick={handleUpvote}
            aria-label="Upvote"
          >
            <FaArrowUp className="text-lg" />
          </button>
          <span className="text-gray-700 font-medium">{post?.upvotes}</span>
        </div>

        <div className="flex items-center mx-2">
          <button
            className="p-1 text-gray-600 hover:text-gray-700 transition-all duration-200"
            onClick={handleDownvote}
            aria-label="Downvote"
          >
            <FaArrowDown className="text-lg" />
          </button>
          <span className="text-gray-700 font-medium">{post?.downvotes}</span>
        </div>

        {/* <button
          className="flex items-center text-gray-600 hover:text-gray-700 transition-all duration-200 mx-2"
          aria-label="Comments"
        >
          <FaComment className="text-lg" />
          <span className="font-medium ml-1">{post.comments.length}</span>
        </button> */}
      </div>
    </div>
  );
};

export default UpDownVoteComponent;
