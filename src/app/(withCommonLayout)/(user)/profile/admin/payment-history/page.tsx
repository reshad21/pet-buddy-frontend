/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Pagination from "@/components/UI/Pagination";
import { useGetCreatedOrder } from "@/hooks/order.hook";
import Image from "next/image";
import { useEffect, useState } from "react";

const PaymentHistoryPage = () => {
  const { mutate: allOrder, data } = useGetCreatedOrder();
  console.log("order information--?", data?.data?.data);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ordersPerPage] = useState<number>(5); // Adjust the number of posts per page

  const totalPages = data
    ? Math.ceil(data?.data?.data.length / ordersPerPage)
    : 0;

  // Pagination logic
  const indexOfLastPost = currentPage * ordersPerPage;
  const indexOfFirstPost = indexOfLastPost - ordersPerPage;
  const currentOrders = data?.data?.data.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Fetch posts when the component mounts
  useEffect(() => {
    allOrder();
  }, [allOrder]);

  return (
    <>
      <div className="p-2">
        <h1 className="text-2xl font-bold mb-4">All Posts</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Products</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders && currentOrders.length > 0 ? (
                currentOrders?.map((orderData: any) => (
                  <tr key={orderData._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">
                      {orderData?.user?.profilePhoto && (
                        <Image
                          width={40}
                          height={40}
                          src={orderData?.user?.profilePhoto}
                          alt={orderData?.user?.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {orderData?.user?.name}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {orderData?.user?.email}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {orderData?.products?.map((product: any) => (
                        <div key={product._id} className="mb-2">
                          <p>
                            <strong>Article Id:</strong> {product._id}
                          </p>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    No posts available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </>
  );
};

export default PaymentHistoryPage;
