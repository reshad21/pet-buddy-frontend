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

  useEffect(() => {
    getpost(id);
  }, [getpost, id]);

  useEffect(() => {
    if (data) {
      setArticle(data?.data);
    }
  }, [data, article]);

  // Initialize payment method state unconditionally
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  // If user is null, set default userInfo values
  const defaultUserInfo = {
    name: user?.name || "",
    email: user?.email || "",
    mobileNumber: user?.mobileNumber || "",
    profilePhoto: user?.profilePhoto || "/default-profile.png",
  };

  // Check if user is null
  if (!user) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Checkout</h1>
        <p className="text-red-600">
          User information is not available. Please log in.
        </p>
        <Link href="/" passHref>
          <button className="mt-4 w-full bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-400 transition duration-300">
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = defaultUserInfo;
    const orderData = { user, article };
    console.log("orderdata-->", orderData);
    createOrder(orderData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Information Section */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-medium text-gray-700 mb-4">
            User Information
          </h2>
          <div className="flex items-center mb-4">
            <Image
              width={400}
              height={400}
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

        {/* Payment Method Section */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-medium text-gray-700 mb-4">
            Payment Method
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={paymentMethod === "creditCard"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              <span>Credit Card</span>
            </label>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              <span>PayPal</span>
            </label>
            <label className="flex items-center mb-4">
              <input
                type="radio"
                name="paymentMethod"
                value="cashOnDelivery"
                checked={paymentMethod === "cashOnDelivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              <span>Cash on Delivery</span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Proced To Payment
            </button>
          </form>
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="mt-6">
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
