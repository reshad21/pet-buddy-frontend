"use client";
import { useUserForgetPassword } from "@/hooks/auth.hook";
import { TFormdata } from "@/services/Forgetpassword";
import { SubmitHandler, useForm } from "react-hook-form";

const ForgotPassword = () => {
  const { mutate: handleForgetPassword } = useUserForgetPassword();
  const { handleSubmit, register } = useForm<TFormdata>();

  const onSubmit: SubmitHandler<TFormdata> = (data) => {
    handleForgetPassword(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Get New Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
