"use client";

import {
  useCreateDownvote,
  useCreateUpvote,
  useGetDownVote,
  useGetUpVote,
} from "@/hooks/vote.hook";
import { IPost } from "@/types";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
// , FaComment
const UpDownVoteComponent = ({ post }: { post: IPost }) => {
  const { mutate: upvote } = useCreateUpvote();
  const { mutate: downvote } = useCreateDownvote();

  const { data: upvotedata } = useGetUpVote(post._id);
  const { data: downvotedata } = useGetDownVote(post._id);

  // console.log("get all upvote from db-->", upvotedata?.data);
  // console.log("get all downvote from db-->", downvotedata?.data);

  const handleUpvote = () => {
    upvote(post._id);
  };

  const handleDownvote = () => {
    downvote(post._id);
  };

  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex">
        <div className="flex items-center">
          <button
            className="p-1 text-blue-900 hover:text-gray-700 transition-all duration-200"
            onClick={handleUpvote}
            aria-label="Upvote"
          >
            <TbArrowBigUp className="text-lg" />
          </button>
          <span className="text-gray-700 font-medium">{upvotedata?.data}</span>
        </div>

        <div className="flex items-center mx-2">
          <button
            className="p-1 text-blue-900 hover:text-gray-700 transition-all duration-200"
            onClick={handleDownvote}
            aria-label="Downvote"
          >
            <TbArrowBigDown className="text-lg" />
          </button>
          <span className="text-gray-700 font-medium">
            {downvotedata?.data}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UpDownVoteComponent;
