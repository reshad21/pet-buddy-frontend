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
    <div className="max-w-4xl mx-auto bg-gray-50 shadow-lg rounded-lg overflow-hidden my-11">
      {post ? (
        <>
          {/* Post Header */}
          <div className="relative h-60 md:h-96">
            {post?.data?.postImage && (
              <Image
                src={post?.data?.postImage || "/placeholder.jpg"}
                alt="Post Image"
                layout="fill"
                className="object-cover"
              />
            )}
          </div>

          {/* Post Body */}
          <div className="p-6">
            {/* Author Info */}
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 relative">
                {post?.data?.author?.img && (
                  <Image
                    src={post?.data?.author?.img}
                    alt="Author"
                    layout="fill"
                    className="rounded-full border border-gray-300"
                  />
                )}
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  {post.data.author.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {post.data.author.email}
                </p>
              </div>
              <button className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Follow
              </button>
            </div>

            {/* Post Content */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {post.data.title}
            </h2>
            <PostContent content={post.data.content} />

            {/* Actions */}
            <div className="flex items-center mt-4 space-x-4">
              <UpDownVoteComponent key={post.data._id} post={post.data} />
              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <FaComment className="mr-2" />
                {comments.length}
              </button>
            </div>

            {/* Comments Section */}
            {showComments && (
              <div className="mt-6 space-y-4">
                {currentUserCommentData && (
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <h4 className="font-semibold text-gray-700">
                      Your Comment:
                    </h4>
                    <p className="text-gray-600">
                      {currentUserCommentData.content}
                    </p>
                  </div>
                )}
                <textarea
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  onClick={handleCommentSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Comment"}
                </button>

                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="flex items-start space-x-4"
                    >
                      <Image
                        src={user?.img || "/default-avatar.jpg"}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <p className="text-gray-600">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Download PDF */}
            <button
              onClick={generatePDF}
              className="mt-6 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
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
