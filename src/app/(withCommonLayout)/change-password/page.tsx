"use client";
import { useUserChangePassword } from "@/hooks/auth.hook";
import { TFormdata } from "@/services/Forgetpassword";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ChangePassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const { handleSubmit, register } = useForm<TFormdata>();
  const {
    mutate: handleChangePassword,
    isPending,
    isSuccess,
  } = useUserChangePassword();

  const onSubmit: SubmitHandler<TFormdata> = (data) => {
    handleChangePassword(data);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push(redirect ? redirect : "/");
    }
  }, [isPending, isSuccess, redirect, router]);

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

export default ChangePassword;
