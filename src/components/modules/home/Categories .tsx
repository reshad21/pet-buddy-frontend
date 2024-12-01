import Link from "next/link";

const Categories = () => {
  // Sample categories
  const categories = ["story", "tip"];

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories?.map((category, index) => (
          <Link key={index} href={`/categories?caterogy=${category}`}>
            <span className="bg-[#783bc5] text-white rounded-full px-4 py-2 text-sm hover:bg-blue-700 transition duration-300 cursor-pointer inline-block">
              {category.toUpperCase()}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
