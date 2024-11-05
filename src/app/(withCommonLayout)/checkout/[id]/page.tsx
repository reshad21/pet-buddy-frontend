"use client";

import { useUser } from "@/context/user.provider";
import { useGetSinglePostDetails } from "@/hooks/post.hook";
import { createOrder } from "@/services/Order";
import { IPost } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CheckOutPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { user } = useUser();
  const { mutate: getpost, data } = useGetSinglePostDetails();
  const [article, setArticle] = useState<IPost | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  useEffect(() => {
    getpost(id);
  }, [getpost, id]);

  useEffect(() => {
    if (data) setArticle(data?.data);
  }, [data]);

  const defaultUserInfo = {
    name: user?.name || "",
    email: user?.email || "",
    mobileNumber: user?.mobileNumber || "",
    profilePhoto: user?.profilePhoto || "/default-profile.png",
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
        <p className="text-red-600">
          Please log in to proceed with your checkout.
        </p>
        <Link href="/" passHref>
          <button className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = { user: defaultUserInfo, article };

    try {
      const res = await createOrder(orderData);
      if (res.data.payment_url) window.location.href = res.data.payment_url;
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 gap-8">
        {/* Purchase Information */}
        <div className="p-5 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            Purchase Summary
          </h2>
          <p className="text-gray-600">
            Purchased this article for{" "}
            <span className="font-semibold">$100</span>.
          </p>
        </div>

        {/* User Information */}
        <div className="p-5 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            User Information
          </h2>
          <div className="flex items-center mb-4">
            <Image
              width={60}
              height={60}
              src={defaultUserInfo.profilePhoto}
              alt={defaultUserInfo.name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {defaultUserInfo.name}
              </p>
              <p className="text-gray-600">{defaultUserInfo.email}</p>
              <p className="text-gray-600">{defaultUserInfo.mobileNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mt-8 p-5 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-xl font-medium text-gray-700 mb-4">
          Payment Method
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          {["creditCard", "paypal", "cashOnDelivery"].map((method) => (
            <label key={method} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 capitalize">
                {method.replace(/([A-Z])/g, " $1")}
              </span>
            </label>
          ))}

          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Proceed to Payment
          </button>
        </form>
      </div>

      <div className="mt-8">
        <Link href="/" passHref>
          <button className="w-full bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-400 transition duration-300">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CheckOutPage;
