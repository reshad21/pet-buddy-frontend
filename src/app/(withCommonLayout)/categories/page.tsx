"use client"; // Indicate this is a client component
import Loading from "@/components/UI/Loading";
import Card from "@/components/UI/Post/Card";
import { useGetSearchPost } from "@/hooks/search.hook";
import { IPost } from "@/types";
import { useSearchParams } from "next/navigation"; // Use next/navigation for App Router
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const searchParams = useSearchParams(); // Get search parameters
  const search = searchParams.get("caterogy"); // Get the search term from the query
  const [results, setResults] = useState<IPost[]>([]); // Initialize results as an empty array
  const [loading, setLoading] = useState(true); // Set loading to true initially

  const {
    mutate: searchpost,
    data: searchData,
    isSuccess,
    isError,
    error, // Capture error to handle it later
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

    setLoading(false); // Stop loading when mutation is complete
  }, [isSuccess, searchData]);

  useEffect(() => {
    if (isError) {
      setLoading(false); // Ensure loading is false if there's an error
    }
  }, [isError]);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-extrabold mb-4 text-pretty text-gray-500">
          CATEGORY: {search?.toUpperCase()}
        </h1>
        {loading ? ( // Show loading component when loading is true
          <Loading />
        ) : isError ? ( // Check for error
          <p className="text-red-500">
            Error fetching results: {error.message}
          </p>
        ) : results.length > 0 ? (
          <div className="flex flex-col gap-4">
            {results?.map((post: IPost) => (
              <Card post={post} key={post._id} />
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default CategoryPage;

// Sample URL: http://localhost:3000/searchPostPage?search=story
// Sample URL: http://localhost:3000/categories?caterogy=story
