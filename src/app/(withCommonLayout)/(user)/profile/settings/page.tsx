/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useUser } from "@/context/user.provider";
import { useUpdateProfileDetails } from "@/hooks/updateProfile.hook";
import { logout } from "@/services/AuthService";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export type TUserProfile = {
  name: string;
  profilePhoto?: string;
  mobileNumber: string;
  img?: string; // Make `img` optional since it's not directly entered by the user
};

const SettingsPage = () => {
  const { user } = useUser();
  console.log("profile page user information-->", user?._id);
  //now call api for get my profile information
  const router = useRouter();
  // Initialize the router

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUserProfile>();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        profilePhoto: user.profilePhoto,
        mobileNumber: user.mobileNumber,
      });
    }
  }, [user, reset]);

  const { mutate: updateprofile, error, isSuccess } = useUpdateProfileDetails();

  const onSubmit: SubmitHandler<TUserProfile> = (data) => {
    const profileUpdateData = {
      name: data.name,
      img: data.profilePhoto, // Map profilePhoto to img
      mobileNumber: data.mobileNumber,
    };

    if (user?._id) {
      updateprofile({ profileUpdateData, postId: user._id });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Error updating profile. Please try again.");
    }

    if (isSuccess) {
      toast.success("Profile updated successfully!");
      // logout(); // Call the logOut function
      // router.push("/login"); // Navigate to the login page
    }
  }, [error, isSuccess, logout, router]);

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
