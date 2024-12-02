"use client";

import UpDownVoteComponent from "@/components/UI/Post/UpDownVoteComponent";
import PostContent from "@/components/UI/PostContent";
import { useUser } from "@/context/user.provider";
import {
  useCreateComment,
  useGetCurrentUserComment,
} from "@/hooks/comment.hook";
import { useGetSinglePostDetails } from "@/hooks/post.hook";
import { ICommentData } from "@/types";
import jsPDF from "jspdf";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";
import PostDetailsSkeleton from "./PostDetailsSkeleton";

const PostDetails = ({ postId }: { postId: string }) => {
  const { user } = useUser();
  const {
    mutate: fetchPostDetails,
    isSuccess,
    data: post,
  } = useGetSinglePostDetails();

  const { mutate: createComment } = useCreateComment();

  // Get the current user's comment (if any) for the post
  const { data: currentUserCommentData } = useGetCurrentUserComment(post?._id);

  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<ICommentData[]>([]);

  useEffect(() => {
    fetchPostDetails(postId);
  }, [postId, fetchPostDetails]);

  useEffect(() => {
    if (isSuccess && post?.data.comments) {
      setComments(post.data.comments);
    }
  }, [isSuccess, post]);

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setIsSubmitting(true);
      const commentData = {
        post: postId,
        author: user?._id || "testUserId",
        content: comment,
      };

      createComment(commentData, {
        onSuccess: (newComment) => {
          setComments((prevComments) => [...prevComments, newComment]);
          setComment("");
        },
        onError: (error) => {
          console.error("Error creating comment:", error);
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      });
    }
  };

  // Generate PDF for post
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Post Title: " + post?.data.title, 10, 10);
    doc.text("Post Content: ", 10, 20);
    doc.text(post?.data.content || "", 10, 30);

    const img = new window.Image();
    img.src = post?.data.postImage || "";
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const base64Image = canvas.toDataURL("image/jpeg");
        doc.addImage(base64Image, "JPEG", 10, 40, 180, 160);
        doc.save("post-details.pdf");
      }
    };
  };

  return (
    <div className="flex flex-col w-full bg-white shadow-md rounded-lg overflow-hidden">
      {post ? (
        <>
          <div className="relative h-48 md:h-96">
            {post?.data?.postImage && (
              <Image
                src={post?.data?.postImage || "/placeholder.jpg"}
                alt="Card Image"
                layout="fill"
                className="rounded-t-lg object-cover"
              />
            )}
          </div>

          <div className="p-4 flex flex-col">
            {/* Author Info */}
            <div className="flex items-center justify-between mb-4 rounded-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 relative">
                  {post?.data?.author?.img && (
                    <Image
                      src={post?.data?.author?.img}
                      alt="Author Image"
                      layout="fill"
                      className="rounded-full border border-gray-300"
                    />
                  )}
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-800">
                    {post.data.author.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {post.data.author.email}
                  </p>
                </div>
              </div>
              <button className="bg-blue-500 text-white text-sm py-1 px-4 rounded-full hover:bg-blue-600 transition duration-300 ml-4">
                Follow
              </button>
            </div>

            {/* Post Content */}
            <div>
              <h2 className="text-xl font-semibold mb-2">{post.data.title}</h2>
              <PostContent content={post.data.content} />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-3">
                <UpDownVoteComponent key={post.data._id} post={post.data} />
                <button
                  className="ml-4 text-gray-600 hover:text-gray-800 flex items-center"
                  onClick={() => setShowComments(!showComments)}
                >
                  <FaComment className="mr-1" />
                  <span>{comments.length}</span>
                </button>
              </div>
            </div>

            {/* Comments Section */}
            {showComments && (
              <div className="mt-6">
                {/* Display Current User's Comment */}
                {currentUserCommentData && (
                  <div className="bg-gray-100 p-3 rounded-lg mb-4">
                    <h4 className="text-sm font-semibold text-gray-700">
                      Your Comment:
                    </h4>
                    <p className="text-gray-600">
                      {currentUserCommentData.content}
                    </p>
                  </div>
                )}

                {/* Comment Input */}
                <textarea
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  className={`mt-2 bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-600 transition duration-300 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleCommentSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Comment"}
                </button>
              </div>
            )}

            {/* Existing Comments */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Comments</h3>
              <div className="space-y-4 h-28 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500">
                {comments.map((comment: ICommentData) => (
                  <div key={comment._id} className="flex items-start space-x-3">
                    <div className="w-10 h-10 relative">
                      <Image
                        src={user?.img || "/default-avatar.jpg"}
                        alt="Author image"
                        layout="fill"
                        className="rounded-full border border-gray-300"
                      />
                    </div>
                    <div>
                      <p className="text-gray-600">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download PDF Button */}
            <button
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
              onClick={generatePDF}
            >
              Download PDF
            </button>
          </div>
        </>
      ) : (
        <PostDetailsSkeleton />
      )}
    </div>
  );
};

export default PostDetails;
