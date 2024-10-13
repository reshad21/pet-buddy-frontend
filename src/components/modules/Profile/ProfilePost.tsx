"use client";
import Card from "@/components/UI/Post/Card";
import { useUser } from "@/context/user.provider";
import { getSingleUserAllPosts } from "@/services/user";
import { IPost } from "@/types";
import { useEffect, useState } from "react";

const ProfilePost = () => {
  const { user } = useUser();
  const [userAllPosts, setAllUserPost] = useState([]);

  useEffect(() => {
    if (user && user._id) {
      getSingleUserAllPosts(user._id)
        .then((details) => {
          console.log("Fetched posts:", details?.data);
          setAllUserPost(details?.data); // Assuming details is an array of posts
        })
        .catch((error) => console.error("Error fetching user posts:", error));
    }
  }, [user]);

  return (
    <div className="max-w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-300">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Post</h2>
      {userAllPosts.length > 0 ? (
        <div className="space-y-4">
          {userAllPosts?.map((post: IPost) => (
            <Card post={post} key={post._id} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No posts available.</p>
      )}
    </div>
  );
};

export default ProfilePost;
