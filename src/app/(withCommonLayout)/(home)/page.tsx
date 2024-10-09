import AllPosts from "@/components/modules/home/AllPosts";
import Categories from "@/components/modules/home/Categories ";
import PopularPosts from "@/components/modules/home/PopularPosts";
import Search from "@/components/modules/home/Search";

export default function Home() {
  // Sample post headings

  return (
    <div className="flex flex-col md:flex-row justify-between gap-3 min-h-screen">
      <div className="w-full md:w-3/4 p-4">
        <AllPosts />
      </div>
      <div className="w-full md:w-1/4 p-4 bg-gray-100 rounded-lg shadow-md">
        <Search />
        <PopularPosts />
        <Categories />
      </div>
    </div>
  );
}
