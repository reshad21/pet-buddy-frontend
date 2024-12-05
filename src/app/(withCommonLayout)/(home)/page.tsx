import AllPosts from "@/components/modules/home/AllPosts";
import Categories from "@/components/modules/home/Categories ";
import GetPremiumMember from "@/components/modules/home/GetPremiumMember";
import PopularPosts from "@/components/modules/home/PopularPosts";
import Search from "@/components/modules/home/Search";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-1 min-h-screen mt-5">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/4 p-4 bg-gray-200 rounded-lg shadow-md">
        <div className="sticky top-24">
          <Search />
          <Categories />
          <GetPremiumMember />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4">
        <AllPosts />
      </div>

      {/* Right Sidebar */}
      <div className="w-full md:w-1/4 p-4 bg-gray-200 rounded-lg shadow-md">
        <div className="sticky top-24">
          <PopularPosts />
        </div>
      </div>
    </div>
  );
}
