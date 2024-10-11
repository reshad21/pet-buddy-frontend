"use client";

import { useUser } from "@/context/user.provider";
import { getCurrentUserDetailsInfo } from "@/services/user";
import { useEffect, useState } from "react";

export default function ProfileIntro() {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState(user);

  useEffect(() => {
    if (user && user._id) {
      getCurrentUserDetailsInfo(user._id)
        .then((details) => {
          console.log("Fetched details:", details.data);
          setUserDetails(details.data);
        })
        .catch((error) => console.error("Error fetching user details:", error));
    }
  }, [user]);

  return (
    <div className="max-w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-300">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Welcome, {userDetails?.name || "Guest"}
      </h2>
      <p className="text-gray-700 mb-2">
        <strong>Email:</strong> {userDetails?.email || "N/A"}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Mobile Number:</strong> {userDetails?.mobileNumber || "N/A"}
      </p>
      <div className="flex justify-between mt-4">
        <div>
          <p className="text-gray-700">
            <strong>Followers:</strong> {userDetails?.followers || 0}
          </p>
        </div>
        <div>
          <p className="text-gray-700">
            <strong>Total Posts:</strong> {userDetails?.posts.length || 0}
          </p>
        </div>
        <div>
          <p className="text-gray-700">
            <strong>Following:</strong> {userDetails?.following || 0}
          </p>
        </div>
      </div>
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
        Edit Profile
      </button>
    </div>
  );
}
