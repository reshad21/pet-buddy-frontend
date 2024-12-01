"use client";
import Card from "@/components/UI/Post/Card";
import { useUser } from "@/context/user.provider";
import { useGetLoginUserAllPost } from "@/hooks/post.hook";
import { IPost } from "@/types";

const ProfilePost = () => {
  const { user } = useUser();
  const { data: userAllPosts } = useGetLoginUserAllPost(user?._id as string);

  return (
    <div className="max-w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-300">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Post</h2>
      {userAllPosts?.data && userAllPosts?.data.length > 0 ? (
        <div className="space-y-4">
          {userAllPosts?.data?.map((post: IPost) => (
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
