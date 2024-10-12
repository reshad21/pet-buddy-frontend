"use client";
import { useUser } from "@/context/user.provider";
import { useGetSinglePostDetails } from "@/hooks/post.hook";
import { createComment } from "@/services/Comment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaComment } from "react-icons/fa";

const PostDetails = ({ postId }: { postId: string }) => {
  const { user } = useUser();
  // console.log(postId);
  const {
    mutate: fetchPostDetails,
    // isLoading,
    isSuccess,
    data: postInfo, // Capture the fetched data
  } = useGetSinglePostDetails();

  useEffect(() => {
    fetchPostDetails(postId);
  }, [postId, fetchPostDetails]);

  useEffect(() => {
    if (isSuccess) {
      console.log("Post details====>:", postInfo?.data); // Log the fetched data
    }
  }, [isSuccess, postInfo]);

  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  // Demo comments array
  const demoComments = [
    {
      id: 1,
      author: "Alice Smith",
      text: "This is a great post! I really enjoyed reading it.",
      authorImageUrl:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    },
    {
      id: 2,
      author: "Bob Johnson",
      text: "Thanks for sharing this information. Very helpful!",
      authorImageUrl:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    },
    {
      id: 3,
      author: "Charlie Brown",
      text: "I found this article very insightful. Keep up the good work!",
      authorImageUrl:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    },
  ];

  const handleCommentSubmit = () => {
    console.log("handleCommentSubmit called"); // Debug log
    if (comment.trim()) {
      const commentData = {
        post: postId,
        author: user?._id || "testUserId", // Temporary test user ID
        content: comment,
      };
      console.log("bundle data that send to db==>", commentData);
      createComment(commentData); // Catch any errors
      setComment(""); // Clear the input field after submission
    }
  };

  const [upvotes, setUpvotes] = useState(12); // Initial upvote count
  const [downvotes, setDownvotes] = useState(3); // Initial downvote count

  const handleUpvote = () => {
    setUpvotes(upvotes + 1);
  };

  const handleDownvote = () => {
    setDownvotes(downvotes + 1);
  };

  return (
    <div className="flex flex-col w-full bg-white shadow-md rounded-lg overflow-hidden">
      {/* Image Section */}
      <div className="relative h-48 md:h-96">
        <Image
          src={postInfo?.data.postImage}
          alt="Card Image"
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
          priority
        />
        {/* Premium Badge */}
        <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
          Premium
        </span>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col">
        {/* Author Information */}
        <div className="flex items-center justify-between mb-4 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 relative">
              <Image
                src={postInfo?.data.author.img}
                alt="Author Image"
                layout="fill"
                objectFit="cover"
                className="rounded-full border border-gray-300"
              />
            </div>
            <div className="ml-4">
              <h4 className="text-base font-medium text-gray-800">
                {postInfo?.data.author.name}
              </h4>
              <p className="text-xs text-gray-500">
                {postInfo?.data.author.email}
              </p>
            </div>
          </div>
          <button className="bg-blue-500 text-white text-sm py-1 px-4 rounded-full hover:bg-blue-600 transition duration-300 ml-4">
            Follow
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">{postInfo?.data.title}</h2>
          <p className="text-gray-600 mb-4">{postInfo?.data.content}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-3">
            {/* Upvote Button */}
            <button
              className="text-green-500 hover:text-green-700"
              onClick={handleUpvote}
            >
              <FaArrowUp />
            </button>
            <span className="text-gray-800">{postInfo?.data.upvotes}</span>

            {/* Downvote Button */}
            <button
              className="text-red-500 hover:text-red-700"
              onClick={handleDownvote}
            >
              <FaArrowDown />
            </button>
            <span className="text-gray-800">{postInfo?.data.downvotes}</span>

            {/* Comments Button */}
            <button
              className="ml-4 text-gray-600 hover:text-gray-800 flex items-center"
              onClick={() => setShowComments(!showComments)}
            >
              <FaComment className="mr-1" />
              <span>{postInfo?.data.comments.length}</span>
            </button>
          </div>
        </div>

        {/* Comment Input Section */}
        {showComments && (
          <div className="mt-6">
            <textarea
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-600 transition duration-300"
              onClick={handleCommentSubmit}
            >
              Comment
            </button>
          </div>
        )}

        {/* Demo Comments Section */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <div className="space-y-4 h-28 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500">
            {demoComments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3">
                <div className="w-10 h-10 relative">
                  <Image
                    src={comment.authorImageUrl}
                    alt={`${comment.author}'s image`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full border border-gray-300"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{comment.author}</h4>
                  <p className="text-gray-600">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
