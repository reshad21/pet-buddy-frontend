"use client";
import FXForm from "@/components/form/FXForm";
import FXInput from "@/components/form/FXInput";
import { useUserRegistration } from "@/hooks/auth.hook";
import registerValidationSchema from "@/schemas/register.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
// import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
// import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");

  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
  } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };

    handleUserRegistration(userData);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push(redirect ? redirect : "/login");
    }
  }, [isPending, isSuccess, redirect, router]);

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
      <h3 className="my-2 text-xl font-bold">Register with Petbuddy</h3>
      <div className="w-[35%]">
        <FXForm
          //! Only for development
          defaultValues={{
            name: "",
            email: "",
            mobileNumber: "",
            password: "",
          }}
          resolver={zodResolver(registerValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="py-3">
            <FXInput label="Name" name="name" size="sm" />
          </div>
          <div className="py-3">
            <FXInput label="Email" name="email" size="sm" />
          </div>
          <div className="py-3">
            <FXInput label="Mobile Number" name="mobileNumber" size="sm" />
          </div>
          <div className="py-3">
            <FXInput
              label="Password"
              name="password"
              size="sm"
              type="password"
            />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 text-default"
            size="lg"
            type="submit"
          >
            Registration
          </Button>
        </FXForm>
        <div className="text-center">
          Already have an account ? <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}
