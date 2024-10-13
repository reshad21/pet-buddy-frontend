import Card from "@/components/UI/Post/Card";
import { getAllPost } from "@/services/Post";
import { IPost } from "@/types";

const AllPosts = async () => {
  const { data: posts } = await getAllPost();
  return (
    <div className="flex flex-col gap-3">
      {posts?.map((post: IPost) => (
        <Card key={post._id} post={post} />
      ))}
    </div>
  );
};

export default AllPosts;
