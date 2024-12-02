import AllPosts from "@/components/modules/home/AllPosts";
import Categories from "@/components/modules/home/Categories ";
import GetPremiumMember from "@/components/modules/home/GetPremiumMember";
import PopularPosts from "@/components/modules/home/PopularPosts";
import Search from "@/components/modules/home/Search";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-3 min-h-screen">
      <div className="w-full md:w-3/4 p-4">
        <AllPosts />
      </div>
      <div className="relative w-full md:w-1/4 p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="sticky top-24 right-4 left-4 md:left-0 md:right-0">
          <Search />
          <PopularPosts />
          <Categories />
          <GetPremiumMember />
        </div>
      </div>
    </div>
  );
}
