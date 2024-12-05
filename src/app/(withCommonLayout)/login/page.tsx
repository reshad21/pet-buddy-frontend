"use client";

import { useUser } from "@/context/user.provider";
import { useUserLogin } from "@/hooks/auth.hook";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");

  const { setIsLoading: userLoading } = useUser();
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserLogin({ email, password });
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push(redirect ? redirect : "/profile");
    }
  }, [isPending, isSuccess, redirect, router]);

  // Handle button click to set user or admin credentials
  const handleRoleClick = (role: "admin" | "user") => {
    if (role === "admin") {
      setEmail("admin@gmail.com");
      setPassword("123456");
    } else {
      setEmail("petbuddy@gmail.com");
      setPassword("123456");
    }
  };

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center my-20">
      <h3 className="my-2 text-3xl font-bold text-gray-800">
        Login to PetBuddy
      </h3>
      <p className="mb-6 text-gray-600">Welcome back! Let’s get started.</p>
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <form onSubmit={onSubmit}>
          <div className="py-3">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="py-3">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button
            className="my-4 w-full rounded-md bg-default-900 text-default transition-colors"
            size="lg"
            type="submit"
            isLoading={isPending}
          >
            Login
          </Button>
        </form>

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

        {/* Buttons for admin and user */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => handleRoleClick("admin")}
            className="w-full bg-green-600 text-white hover:bg-green-700"
          >
            Admin
          </Button>
          <Button
            onClick={() => handleRoleClick("user")}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            User
          </Button>
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
