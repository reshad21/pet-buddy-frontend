import Link from "next/link";

const PopularPosts = () => {
  // Sample post headings
  const postHeadings = [
    "Top 10 Tips for Productivity",
    "How to Stay Motivated Every Day",
    "The Best Tools for Developers",
    "Why Mindfulness Matters",
    "Health and Wellness for Busy People",
  ];
  return (
    <>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-4">Popular Posts</h2>
        <ul className="space-y-2">
          {postHeadings.map((heading, index) => (
            <li key={index} className="text-blue-600 hover:underline">
              <Link href="/">{heading}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PopularPosts;
