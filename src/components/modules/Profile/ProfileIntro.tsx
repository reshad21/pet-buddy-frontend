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

  // This useEffect runs whenever userDetails changes, allowing you to see the updated state
  useEffect(() => {
    console.log("Updated userDetails:", userDetails);
  }, [userDetails]);

  return (
    <>
      <h2>Welcome, {userDetails?.name || "Guest"}</h2>
      <p>Email: {userDetails?.email || "N/A"}</p>
      <p>mobileNumber: {userDetails?.mobileNumber || "N/A"}</p>
    </>
  );
}
