import Card from "@/components/UI/Post/Card";

export default function Page() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    followers: ["Jane Smith", "Mark Johnson", "Alice Brown"],
    following: ["Bob White", "Emily Davis"],
  };

  // Static posts data
  const posts = [
    {
      id: 1,
      title: "My First Post",
      description: "This is a brief description of my first post.",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      id: 2,
      title: "Another Day, Another Post",
      description: "Here's some content about my day.",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      id: 3,
      title: "Sharing My Thoughts",
      description: "I want to share my thoughts on a few things.",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* User Profile Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {user.name} Profile
        </h1>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <div className="flex justify-between text-gray-600 mb-4">
          <p>
            <span className="font-semibold">Followers:</span>{" "}
            {user.followers.length}
          </p>
          <p>
            <span className="font-semibold">Following:</span>{" "}
            {user.following.length}
          </p>
        </div>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Followers List:</span>
          <ul className="list-disc pl-6">
            {user.followers.map((follower, index) => (
              <li key={index}>{follower}</li>
            ))}
          </ul>
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Following List:</span>
          <ul className="list-disc pl-6">
            {user.following.map((followed, index) => (
              <li key={index}>{followed}</li>
            ))}
          </ul>
        </p>

        <div className="mt-4">
          <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
            Edit Profile
          </button>
        </div>
      </div>

      {/* User Posts Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <Card
              key={post.id}
              postId={post.id}
              title={post.title}
              description={post.description}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
