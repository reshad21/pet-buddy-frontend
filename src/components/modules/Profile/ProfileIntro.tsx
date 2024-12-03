"use client";

import { useUser } from "@/context/user.provider";
import { useGetSingleUserDetails } from "@/hooks/auth.hook";
import Link from "next/link";
import ProfileIntroSkeleton from "./ProfileIntroSkeleton";

export default function ProfileIntro() {
  const { user } = useUser();
  const { data: userDetails } = useGetSingleUserDetails(user?._id as string);
  console.log("profile intro data-->", userDetails);

  if (!userDetails || !userDetails.data) {
    return <ProfileIntroSkeleton />;
  }

  return (
    <>
      {userDetails ? (
        <div className="max-w-full mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome, {userDetails?.data.name || "Guest"}
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong> {userDetails?.data.email || "N/A"}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Mobile Number:</strong>{" "}
            {userDetails?.data.mobileNumber || "N/A"}
          </p>
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-gray-700">
                <strong>Followers:</strong>{" "}
                {userDetails?.data.followers.length || 0}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <strong>Total Posts:</strong>{" "}
                {userDetails?.data.posts.length || 0}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <strong>Following:</strong>{" "}
                {userDetails?.data.following.length || 0}
              </p>
            </div>
          </div>
          <Link href={"/profile/settings"}>
            <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Edit Profile
            </button>
          </Link>
        </div>
      ) : (
        <ProfileIntroSkeleton />
      )}
    </>
  );
}
