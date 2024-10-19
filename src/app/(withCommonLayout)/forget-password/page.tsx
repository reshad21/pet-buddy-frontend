"use client";
import { changePassword, TFormdata } from "@/services/Forgetpassword";
import { SubmitHandler, useForm } from "react-hook-form";

const ForgotPassword = () => {
  const { handleSubmit, register } = useForm<TFormdata>();

  const onSubmit: SubmitHandler<TFormdata> = (data) => {
    console.log("Old and New Password:", data);
    changePassword(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Change Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              {...register("oldPassword")}
              className="mt-1 p-2 block w-full border rounded-md"
              placeholder="Enter your old password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              {...register("newPassword")}
              className="mt-1 p-2 block w-full border rounded-md"
              placeholder="Enter your new password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
