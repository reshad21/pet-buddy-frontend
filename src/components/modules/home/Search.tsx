"use client"; // Indicate this is a client component
import { useGetSearchPost } from "@/hooks/search.hook";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    mutate: searchpost,
    data: searchData,
    isSuccess,
  } = useGetSearchPost();
  const router = useRouter(); // Initialize the router

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchpost(searchTerm); // Call the mutation to get the search results
  };

  useEffect(() => {
    if (isSuccess && searchData) {
      // Redirect to the search results page with the search term
      router.push(`/searchPostPage?search=${encodeURIComponent(searchTerm)}`);
    }
  }, [searchData, isSuccess, searchTerm, router]);

  return (
    <form onSubmit={handleSearch} className="flex items-center w-full mb-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <FaSearch className="text-gray-600" />
        </div>
      </div>
    </form>
  );
};

export default Search;
