// app/searchPostPage/page.js
"use client"; // Indicate this is a client component
import Loading from "@/components/UI/Loading";
import Card from "@/components/UI/Post/Card";
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
      <h1 className="text-2xl font-extrabold mb-4 text-pretty text-gray-500">
        Search For: {search?.toUpperCase()}
      </h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {results?.map((post: IPost) => (
            <Card post={post} key={post._id} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SearchPostPage;
