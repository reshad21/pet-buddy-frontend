// app/searchPostPage/page.js
"use client"; // Indicate this is a client component
import { useGetSearchPost } from "@/hooks/search.hook";
import { IPost } from "@/types";
import { useSearchParams } from "next/navigation"; // Use next/navigation for App Router
import { useEffect, useState } from "react";

const SearchPostPage = () => {
  const searchParams = useSearchParams(); // Get search parameters
  const search = searchParams.get("search"); // Get the search term from the query
  const [results, setResults] = useState([]); // Initialize results as an empty array

  const {
    mutate: searchpost,
    data: searchData,
    isSuccess,
  } = useGetSearchPost();

  useEffect(() => {
    if (search) {
      searchpost(search); // Call the mutation with the search term
    }
  }, [search, searchpost]);

  useEffect(() => {
    if (isSuccess && searchData) {
      setResults(searchData.data); // Set the results directly when successful
    }
  }, [isSuccess, searchData]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for: {search}</h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((post: IPost) => (
            <div key={post._id} className="border rounded-lg p-4 shadow-md">
              <h2 className="font-semibold text-lg">{post.title}</h2>
              <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
              <a
                href={`/posts/${post._id}`}
                className="text-blue-500 hover:underline"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPostPage;
