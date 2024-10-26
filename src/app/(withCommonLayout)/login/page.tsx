"use client";

import FXForm from "@/components/form/FXForm";
import FXInput from "@/components/form/FXInput";
import { useUser } from "@/context/user.provider";
import { useUserLogin } from "@/hooks/auth.hook";
import loginValidationSchema from "@/schemas/login.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");

  const { setIsLoading: userLoading } = useUser();
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log("get data for login form-->", data);
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push(redirect ? redirect : "/");
    }
  }, [isPending, isSuccess, redirect, router]);

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center bg-gray-50 px-4">
      <h3 className="my-2 text-3xl font-bold text-gray-800">
        Login to PetBuddy
      </h3>
      <p className="mb-6 text-gray-600">Welcome back! Let’s get started.</p>
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <FXForm
          onSubmit={onSubmit}
          resolver={zodResolver(loginValidationSchema)}
        >
          <div className="py-3">
            <FXInput name="email" label="Email" type="email" />
          </div>
          <div className="py-3">
            <FXInput name="password" label="Password" type="password" />
          </div>

          <Button
            className="my-4 w-full rounded-md bg-blue-600 font-semibold text-white hover:bg-blue-700 transition-colors"
            size="lg"
            type="submit"
            isLoading={isPending}
          >
            Login
          </Button>
        </FXForm>

        <div className="my-4 text-center text-gray-600">
          <Link
            href="/forget-password"
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="my-4 flex items-center justify-center">
          <span className="w-full h-px bg-gray-300"></span>
          <span className="mx-3 text-sm text-gray-500">OR</span>
          <span className="w-full h-px bg-gray-300"></span>
        </div>

        <div className="text-center">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
