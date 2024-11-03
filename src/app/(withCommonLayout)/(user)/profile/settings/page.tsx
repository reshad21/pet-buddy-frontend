/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useUser } from "@/context/user.provider";
import { useUpdateProfileDetails } from "@/hooks/updateProfile.hook";
import { getCurrentUserDetailsInfo } from "@/services/user";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export type TUserProfile = {
  name: string;
  profilePhoto?: string;
  mobileNumber: string;
  img?: string;
};

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
  mobileNumber: string;
}

const SettingsPage = () => {
  const { user } = useUser();
  const router = useRouter(); // Initialize the router
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchUserData = async () => {
    if (user?._id) {
      try {
        const response = await getCurrentUserDetailsInfo(user?._id);
        setUserData(response?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user?._id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUserProfile>();

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name,
        profilePhoto: userData.img,
        mobileNumber: userData.mobileNumber,
      });
    }
  }, [userData, reset]);

  const { mutate: updateProfile, error, isSuccess } = useUpdateProfileDetails();

  const onSubmit: SubmitHandler<TUserProfile> = (data) => {
    const profileUpdateData = {
      name: data.name,
      img: data.profilePhoto,
      mobileNumber: data.mobileNumber,
    };

    if (user?._id) {
      updateProfile({ profileUpdateData, postId: user._id });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully!");
      fetchUserData(); // Refetch user data to get updated profile
      router.push("/profile"); // Redirect to profile page
    }
    if (error) {
      toast.error("Error updating profile. Please try again.");
    }
  }, [isSuccess, error]);

  return (
    <div className="max-w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-300">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        User Settings
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Image URL Field */}
        <div>
          <label className="block text-gray-700 mb-1">Profile Image URL</label>
          <input
            type="text"
            {...register("profilePhoto", { required: "Image URL is required" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.profilePhoto && (
            <p className="text-red-500 text-sm">
              {errors.profilePhoto.message}
            </p>
          )}
        </div>

        {/* Mobile Number Field */}
        <div>
          <label className="block text-gray-700 mb-1">Mobile Number</label>
          <input
            type="tel"
            {...register("mobileNumber", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Invalid mobile number format",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm">
              {errors.mobileNumber.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Update Settings
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
