"use client";

import UpDownVoteComponent from "@/components/UI/Post/UpDownVoteComponent";
import PostContent from "@/components/UI/PostContent";
import { useUser } from "@/context/user.provider";
import { useGetSinglePostDetails } from "@/hooks/post.hook";
import { createComment } from "@/services/Comment";
import { ICommentData } from "@/types";
import jsPDF from "jspdf";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";

const PostDetails = ({ postId }: { postId: string }) => {
  const { user } = useUser();
  const {
    mutate: fetchPostDetails,
    isSuccess,
    data: post, // Capture the fetched data
  } = useGetSinglePostDetails();

  // Fetch post details when the component mounts
  useEffect(() => {
    fetchPostDetails(postId);
  }, [postId, fetchPostDetails]);

  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<ICommentData[]>([]);

  useEffect(() => {
    if (isSuccess && post?.data.comments) {
      setComments(post.data.comments);
    }
  }, [isSuccess, post]);

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      const commentData = {
        post: postId,
        author: user?._id || "testUserId", // Temporary test user ID
        content: comment,
      };
      try {
        const createdComment = await createComment(commentData);
        setComments((prevComments) => [...prevComments, createdComment]);
        setComment("");
      } catch (error) {
        console.error("Error creating comment:", error);
      }
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add post title and content to the PDF
    doc.text("Post Title: " + post?.data.title, 10, 10);
    doc.text("Post Content: ", 10, 20);
    doc.text(post?.data.content || "", 10, 30);

    // Add post image to the PDF
    const imageUrl = post?.data.postImage; // Assuming this is a valid image URL

    const img = new window.Image(); // or simply new Image();
    img.src = imageUrl;

    img.onload = () => {
      doc.addImage(img, "JPEG", 10, 40, 180, 160); // Adjust dimensions as needed
      doc.save("post-details.pdf");
    };
  };

  return (
    <div className="flex flex-col w-full bg-white shadow-md rounded-lg overflow-hidden">
      {/* Image Section */}
      {post && (
        <>
          <div className="relative h-48 md:h-96">
            <Image
              src={post.data.postImage}
              alt="Card Image"
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
              priority
            />
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
                    src={post.data.author.img}
                    alt="Author Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full border border-gray-300"
                  />
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

            <div>
              <h2 className="text-xl font-semibold mb-2">{post.data.title}</h2>
              <PostContent content={post.data.content} />
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-3">
                {post && (
                  <UpDownVoteComponent key={post.data._id} post={post.data} />
                )}

                <button
                  className="ml-4 text-gray-600 hover:text-gray-800 flex items-center"
                  onClick={() => setShowComments(!showComments)}
                >
                  <FaComment className="mr-1" />
                  <span>{comments.length}</span>
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

            {/* Comments Section */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Comments</h3>
              <div className="space-y-4 h-28 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500">
                {comments.map((comment: ICommentData) => (
                  <div key={comment._id} className="flex items-start space-x-3">
                    <div className="w-10 h-10 relative">
                      <Image
                        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                        alt="author image"
                        layout="fill"
                        objectFit="cover"
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

            {/* PDF Download Button */}
            <button
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
              onClick={generatePDF}
            >
              Download PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetails;
