"use client";

import { useUser } from "@/context/user.provider";
import { getUserFormAxiois } from "@/services/user";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SidebarOptions } from "./SidebarOptions";
import { adminLinks, userLinks } from "./constants";

interface PurchasedContent {
  _id: string;
  isPremium: boolean;
}

interface UserData {
  purchasedContent: PurchasedContent[];
  email: string;
  img: string;
  name: string;
  role: string;
}

const Sidebar = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);

  // Fetch user data from the database
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?._id && !userData) {
        // Check if userData is already set to avoid unnecessary fetches
        try {
          const response = await getUserFormAxiois(user?._id);
          setUserData(response?.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user?._id, userData]); // Keep only essential dependencies

  return (
    <div>
      <div className="rounded-xl bg-default-100 p-2">
        <div className="h-[330px] w-full rounded-md">
          <Image
            alt="profile"
            className="w-full h-full object-cover rounded-md"
            height={330}
            src={userData?.img as string}
            width={330}
          />
        </div>
        <div className="my-3">
          <h1 className="text-2xl font-semibold">{userData?.name}</h1>
          <p className="break-words text-sm">{userData?.email}</p>
        </div>
        <Button
          as={Link}
          className="mt-2 w-full rounded-md"
          href={"/profile/create-post"}
        >
          Create a post
        </Button>
      </div>
      <div className="mt-3 space-y-2 rounded-xl bg-default-100 p-2">
        <SidebarOptions
          links={userData?.role === "user" ? userLinks : adminLinks}
        />
      </div>
    </div>
  );
};

export default Sidebar;
